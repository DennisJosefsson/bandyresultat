# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

teamIds = {
    "Villa Lidköping BK":1,
    "Hammarby IF":2,
    "IFK Motala":3,
    "GAIS Bandy":4,
    "Västerås SK":5,
    "Edsbyns IF":6,
    "Kalix BF":7,
    "Sandvikens AIK":8,
    "IFK Vänersborg":9,
    "IK Sirius":10,
    "Bollnäs GIF":11,
    "Vetlanda BK":12,
    "Broberg/Söderhamn Bandy":13,
    "Ljusdals BK":14,
    "IFK Kungälv":15,
    "Frillesås BK":16,
    "Nässjö IF":17,
    "IFK Rättvik":18,
    "Tranås BoIS":19,
    "Gripen Trollhättan BK":20,
    "Örebro SK":21,
    "GAIS": 4
    }


class ElitserienPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        team_id_keys = ['home_team_id', 'away_team_id']
        for key in team_id_keys:
            team = adapter.get(key)
            adapter[key] = teamIds[team]
        
        return item