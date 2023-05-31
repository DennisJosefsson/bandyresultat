import scrapy

teams = []

object = {
    "Hammarby IF": "Stockholm",
    "Villa Lidköping BK": "Lidköping",
    "IFK Motala": "Motala",
    "Bollnäs GIF": "Bollnäs",
    "Vetlanda BK": "Vetlanda",
    "Sandvikens AIK": "Sandviken",
    "Edsbyns IF": "Edsbyn",
    "IK Sirius": "Uppsala",
    "IFK Vänersborg": "Vänersborg",
    "Broberg/Söderhamn Bandy": "Söderhamn",
    "IFK Kungälv": "Kungälv",
    "Ljusdals BK": "Ljusdal",
    "GAIS Bandy": "Göteborg",
    "Västerås SK": "Västerås",
    "Kalix BF": "Kalix",
    "Haparanda Tornio BK": "Haparanda",
    "Tillberga IK": "Västerås"
}


class TeamsSpider(scrapy.Spider):
    name = "teams"
    
    def start_requests(self):
        urls = [
            "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2012/2013",
            "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2013/2014",
             "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2011/2012",
            "https://sv.wikipedia.org/wiki/Elitserien_i_bandy_2010/2011"
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        results = response.xpath('//table[contains(.,"Matchresultat")]//ul')
        games = results.css('li::text').getall()

        for game in games: 
            parts = game.split('-')
            name = ' '.join(''.join(parts[0]).split(' ')[3:])

            if name in teams:
                continue
            else:
                teams.append(name)
            try: 
              city = object[name]
              yield{
                'name': name,
                'city': city
            }
            except:
                pass
            