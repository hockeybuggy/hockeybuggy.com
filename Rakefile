
namespace "dev" do
    desc "Builds the site for local consumption"
    task :build do
        system "jekyll build --config _config.yml,_dev_config.yml"
    end

    desc "Runs a development site on port 4000"
    task :server do
        # TODO make the port adjustable
        system "jekyll server --watch --config _config.yml,_dev_config.yml"
        #guardPid = Process.spawn("guard",
        #:out => "/dev/null", :err => "/dev/null")
        #jekyllPid = Process.spawn("jekyll server --watch --config _config.yml,_dev_config.yml")
    end
end


desc 'Create a post'
task :create_post, [:category, :date, :content] do |t, args|
    if args.category == nil or 
        (args.date and args.date.match(/[0-9]+-[0-9]+-[0-9]+/) == nil) then
        puts "Usage: create post CATEGORY [DATE]"
        puts "Date is in the form: Y-m-d"
        exit 1
    end

    post_category= args.category
    post_date= args.date || Time.new.strftime("%Y-%m-%d %H:%M:%S")

    # remove the time from post_date (the filename does not support it)
    file_random_str = (0..8).map{ ( 97 + rand(26)).chr }.join
    filename = post_date[0..9] + "-" + post_category + "-" + file_random_str + ".md"

    puts filename
    # the if is not really necessary anymore
    if not File.exists?("_posts/" + filename) then
        File.open("_posts/" + filename, 'w') do |f|
            f.puts "---"
            f.puts "title: "
            f.puts "layout: post"
            f.puts "category: #{post_category}"
            f.puts "date: #{post_date}"
            f.puts "---"
            f.puts args.content if args.content != nil
        end  

        puts "Post created under _posts/#{filename}"
    else
        puts "A post with the same name already exists. Aborted."
    end
    puts "You might want to: edit _posts/#{filename}"
end

