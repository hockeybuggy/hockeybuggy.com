+++
title = "Experimenting with Protobufs generated types in Rust"
slug = "experimenting-with-protobufs-generated-types-in-rust"
date = 2020-01-18
tags = ["development", "rust", "protobufs"]
categories = ["misc"]
+++

This past week I was thinking about what it would take to design and build a
home heating monitoring and control system. A "normal" mid-week thought. I was
imagining something like a small computer in each room that would have a
thermometer on radiator and thermometer measuring the ambient air temperature.
These smaller computers would send messages into a "central" computer that
would record things and turn radiators on and off. These computers would be on
a separate physical network from other devices in the house and would not be
internet connected (because having your house not work when the internet is
down sounds super frustrating).

These smaller computers will need to encode the information in some format and
send it to the central computer. Being a web developer I reached for familiar
tools and decided to make the systems communicate via HTTP, but since I
wanted to try something new: instead of having the body of the HTTP messages be
a plain text format I decided to try using Protobufs.


## What is a Protobuf

Protobufs are short for "Protocol buffers" and are a Google created mechanism
for serializing structured data into a binary format. They work be having
defined message types in `.proto` files. These files can then be used by
various programming languages to generate a language appropriate binding that
can be used to encode and decode messages.

The documentation on [why you might want to use
Protobufs](https://developers.google.com/protocol-buffers/docs/overview#whynotxml)
does a good job of explaining their advantages. Using Protobufs have some
trade-offs that likely make them not the most appropriate format for a hobby
home automation project (such as not being human readable), but here we are.


## Generating Rust structs from a Protobuf

I selected [the Prost library][PROST] somewhat arbitrarily since, in
retrospect, I didn't look into
[other](https://github.com/stepancheg/rust-protobuf)
[options](https://github.com/tafia/quick-protobuf).

I started off by installing Prost by adding this to my `Cargo.toml`:

```toml
[dependencies]
prost = "0.6"

[build-dependencies]
prost-build = "0.6"
```

Then creating a minimal `.proto` file called `src/messages.proto`:

```proto
syntax = "proto3";

package messages;

message ThermostatState {
    string name = 1;
    double air_temp = 2;
    double rad_temp = 3;
}
```

After that followed the instructions for using `prost-build` to generate a
struct from the Protobuf definition. That included adding the following to the
`Cargo.toml`:

```toml
build = "src/build.rs"
```

Creating a `src/build.rs` file that looks like this:

```rust

extern crate prost_build;

fn main() {
    prost_build::compile_protos(&["src/messages.proto"], &["src/"]).unwrap()
}
```

This file compiles are of the Protobufs in the first argument and outputs the
generated code to the second argument. That means that it will output a Rust
file that looks like this:

```rust
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ThermostatState {
    #[prost(string, tag="1")]
    pub name: std::string::String,
    #[prost(double, tag="2")]
    pub air_temp: f64,
    #[prost(double, tag="3")]
    pub rad_temp: f64,
}
```

The project's compile step generates the new rust file but we need to import it
to be useful. We do this by `include!` the file into the `src/lib.rs` file.

```rust
pub mod messages {
    // The name "messages" corresponds with the `package` name in the `.proto`
    include!(concat!(env!("OUT_DIR"), "/messages.rs"));
}
```

The `struct` can then be constructed an used as a return type normally: 

```rust
pub fn create_thermostat_state(name: String) -> messages::ThermostatState {
    let mut state = messages::ThermostatState::default();
    state.name = name;
    state
}
```


[PROST]: https://github.com/danburkert/prost


## Encoding and decoding


Now that we are able to generate Rust code from the Protobufs we next want to
send them from one system to another.

### Sending

To send a HTTP POST I reached for the
[`reqwest`](https://docs.rs/crate/reqwest/0.10.1) package (again didn't do a
ton of research, just picked a dependency that looked good enough). I was then
able to construct a Protobuf, encode it, then send it as a request body:

```rust
use reqwest;
use tokio;

// This trait needs to be included in order to call `.encode`
use prost::Message;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let msg = home_auto::create_thermostat_state("foo".to_string());
    // This being fixed length could be improved
    let mut buf: Vec<u8> = Vec::with_capacity(200);

    msg.encode(&mut buf).unwrap();

    let client = reqwest::Client::new();
    let _resp = client
        .post("http://localhost:8080")
        .body(buf)
        .send()
        .await?;
    println!("sent");
    Ok(())
}
```

The documentation for [`encode` can be found
here.](https://docs.rs/prost/0.6.1/prost/trait.Message.html#method.encode).


### Receiving

The next step was getting something serving HTTP requests running on
`localhost:8080`. To do this I also picked a dependency somewhat arbitrarily
and used [`warp`](https://docs.rs/crate/warp/0.2.0).


```rust
use bytes;
use tokio;
use warp::Filter;

// This trait is required to call `ThermostatState::decode`
use prost::Message;

#[tokio::main]
async fn main() {
    let route = warp::body::content_length_limit(1024 * 32)
        .and(warp::body::bytes())
        .map(|bytes: bytes::Bytes| {
            println!("bytes = {:?}", bytes);
            let msg = home_auto::messages::ThermostatState::decode(bytes).unwrap();
            println!("msg = {:?}", msg);
            "ok"
        });

    warp::serve(route).run(([127, 0, 0, 1], 8080)).await
}
```

This will bind to port 8080 and start decoding all request bodies as if they
are valid `ThermostatState` Protobufs (which seems like a dangerous assumption
if this was meant to be long living code).


### Results

Each time the first program is run the second program will print:

```
bytes = b"\n\x03foo"
msg = ThermostatState { name: "foo", air_temp: 0.0, rad_temp: 0.0 }
```

The first bit is the binary format sent over the wire and the second is the `std::fmt::Debug` of the generated `struct`.

Which is pretty neat!


## Conclusions

This was a fun thing to try out and I feel like I learned a few things from the process:

1. You could generate Rust structs from preexisting Protobufs allowing a typed boundary between languages.
2. Tooling to this approach (as is) is imperfect since the generated file only exists at compile time.
2. Async/Await in rust is wonderful and I am grateful of people's hard work to make it happen.

I could picture reaching for Protobufs again in the future.
