require "open-uri"
require "nokogiri"
require "json"
require 'goog_currency'


EUR_TO_INR = GoogCurrency.eur_to_inr(1).round()
PYEAR = (Time.now.year - 1)

namespace :phone do
  desc "Add Brands"
  task :add_brands => :environment do
    brands = %w[huawei lg oneplus microsoft samsung apple sony htc motorola].each(&:capitalize!)
    brands.each do |brand|
      Brand.find_or_create_by(name: brand)
    end
    puts "Done brands"
  end

  desc "Add Phones"
  task :add_models => [:environment, :add_brands] do

    Brand.all.each do |brand|
      x = nokopen("http://www.gsmarena.com/results.php3?sQuickSearch=yes&sName=#{brand}")
      x.css(".makers > ul > li").each do |model|
        title = model.xpath("a/img/@title").text
        valid = title[/\b\s\d{4,4}/i].to_i >= PYEAR
        visit = "http://www.gsmarena.com/"<<model.xpath("a/@href").text
        visitopen = nokopen(visit)
        visitopenreview = visitopen.css(".help-review > a")
        if valid && visitopenreview.any?
          brand.models.find_or_create_by(name: model.xpath("a/strong/span/text()[2]").text) do |create_model|
            create_model.url = "http://www.gsmarena.com/"<<model.xpath("a/@href").text
            create_model.img = model.xpath("a/img/@src").text
            create_model.title = title
            create_model.review_url = visitopenreview.first.xpath("@href").text[/http\:\/\//] ? visitopenreview.first.xpath("@href").text : ("http://www.gsmarena.com/" + visitopenreview.first.xpath("@href").text)
          end
        end
      end
    end
    puts "Done models"
  end

  desc "Task description"
  task :abcd => :environment do
    # d = nokopen("http://www.gsmarena.com/quicksearch-6376.jpg")
    Model.all.each do |m|
      doc = nokopen(m.url)
      popularity = doc.css(".help-popularity .accent").text[/^\d+(\.\d{1,2})?$/].to_f
      m.update(popularity: popularity) if popularity
    end
  end


  desc "adding specifications"
  task :add_specs => :environment do
    Model.where(features: nil).each do |m|
      puts m.id
      x = nokopen(m.url)

      if x.css(".price").text[/\d{1,4}/].to_i > 0 && m.title[/\d{4,4}/].to_i >= PYEAR

        size = x.xpath('//*[@id="body"]/div/div[1]/div/div[2]/ul/li[4]/strong/text()').text.to_f
        camera = x.xpath('//*[@id="body"]/div/div[1]/div/div[2]/ul/li[5]/strong/text()[1]').text.to_f
        ram = x.xpath('//*[@id="body"]/div/div[1]/div/div[2]/ul/li[6]/strong/text()').text.to_f
        battery = x.xpath('//*[@id="body"]/div/div[1]/div/div[2]/ul/li[7]/strong/text()').text.to_i
        ppi = x.css(".nfo").text[/\d*.ppi/].to_i
        eur = x.css(".price").text[/\d{1,4}/].to_i
        inr = EUR_TO_INR * eur
        popularity = x.css(".help-popularity .accent").text.to_f

        m.update(price: setPrice(inr), size: setSize(size), ppi: setppi(ppi), camera: setCam(camera), ram: setRam(ram), battery: setBat(battery))

        spin_url = m.url
        spin_url["-"] = "-3d-spin-"
        spin = nokopen(spin_url)
        swf = spin.css(".centerer > script").children.text[/http.*swf/]
        spec_sheet = x.css("#specs-list").to_html.gsub(/[[:space:]]/, "	")

        m.update(popularity: popularity, _price: inr, _size: size, _ppi: ppi, _camera: camera, _ram: ram, _battery: battery, spec_sheet: spec_sheet, swf: swf)

        x = nokopen(m.review_url)
        features = x.css(".article-blurb-features").to_html.gsub(/[[:space:]]/, " ")
        disadvantages = x.css(".article-blurb-disadvantages").to_html.gsub(/[[:space:]]/, " ")

        m.update(features: features, disadvantages: disadvantages)
      else
        puts "Deleting #{m.name} ~ #{m.title[/\d{4,4}/]}"
        m.delete
      end
    end
    puts "Done specs"
  end


  desc "all"
  task :all => %i(add_brands add_models add_specs) do
  end

  def setPrice(val)
    if val < 12000
      return -1
    elsif val > 25000
      return 1
    end
    return 0
  end
  def setSize(val)
    case val
    when 3.0..4.2
      return -1
    when 4.3..5.2
      return 0
    when 5.3..6.2
      return 1
    end
  end

  def setCam(val)
    case val
    when 0..5.5
      return -1
    when 5.6..10
      return 0
    else
      return 1
    end
  end

  def setppi(val)
    if val < 250
      return -1
    elsif val > 380
      return 1
    end
    return 0
  end

  def setBat(val)
    if val < 1800
      return -1
    elsif val > 2800
      return 1
    end
    return 0
  end

  def setRam(val)
    if val >= 15
      return -1
    elsif val >= 1.5
      return 1
    end
    return 0
  end

  def nokopen(url)
    html = open(url)
    doc = Nokogiri::HTML(html.read, nil, "utf-8")
    return doc
  end
end

