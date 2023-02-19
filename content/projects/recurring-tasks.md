---
title: Recurring tasks
slug: "recurring-tasks"
order: 40
github: "https://github.com/hockeybuggy/recurring_tasks"
bannerImageName: "projects/recurring-tasks/banner.png"
bannerAltText: "An screenshot of an image of a email received from a 'recurring' email address. The is a list of upcoming tasks."
---

A tool to periodically send myself emails of recurring tasks. A calendar app
would also do this, but having recurring tasks in version control is something
I wanted and writing this was quite fun.

<!-- excerpt -->

This little utility is something I wrote for myself in Rust. It's split into
two parts: a [public repo](https://github.com/hockeybuggy/recurring_tasks) and
a private repo. The public repo contains executable that when run will read a
file called `tasks.toml` and generate a `subject.txt` and `body.html` output.

The `tasks.toml` file will looks something like this:

```toml
timezone = "America/Toronto"
#                  ┌───────────── sec (0 - 59)
#                  │ ┌───────────── minute (0 - 59)
#                  │ │ ┌───────────── hour (0 - 23)
#                  │ │ │ ┌───────────── day of the month (1 - 31)
#                  │ │ │ │ ┌───────────── month (1 - 12 or JAN-DEC)
#                  │ │ │ │ │ ┌───────────── day of the week (0 - 6 or SUN-SAT)
#                  │ │ │ │ │ │ ┌───────────── year
#                  │ │ │ │ │ │ │
#                  │ │ │ │ │ │ │
#                  * * * * * * *

[tasks.recycling_green_bin]
cron_expression = "0 30 9 1-7,16-21 * 4 *"
name = "Take out the Garbage, Green bin"

[tasks.garbage_green_bin]
cron_expression = "0 30 9 8-15,22-31 * 4 *"
name = "Take out the Recycling, Green bin"

[tasks.rent]
cron_expression = "0 30 9 28 * * *"
name = "Pay rent"
```

The private repo contains things in my life that recur that I would like to be
reminded about. It contains my real `tasks.toml`. The private repo also
contains a GitHub action that looks like this:

```yaml
name: Send Email

on:
  schedule:
    # * is a special character in YAML so you have to quote this string
    - cron:  '0 11 * * *'

jobs:
  send-email:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Checkout recurring tasks
      uses: actions/checkout@v2
      with:
        repository: hockeybuggy/recurring_tasks
        path: recurring_tasks

    - name: Build
      run: cd recurring_tasks && cargo build --verbose --release

    - name: Run the program
      run: ./recurring_tasks/target/release/recurring_tasks_bin --tasks tasks.toml

    - name: SendGrid
      uses: peter-evans/sendgrid-action@v1
      env:
        SENDGRID_API_KEY: ${{ secrets.SEND_GRID_API_KEY }}
```

Then every day when the GitHub action is triggered I receive an email that
contains my daily tasks.
