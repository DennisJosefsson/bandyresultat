# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter

teamIds = {
    "Villa Lidköping BK":1,
    115: 1,
    "Hammarby IF":2,
    117: 2,
    "IFK Motala":3,
    "GAIS Bandy":4,
    130: 4,
    "Västerås SK":5,
    132: 5,
    "Edsbyns IF":6,
    114: 6,
    "Kalix BF":7,
    181: 7,
    "Sandvikens AIK":8,
    137: 8,
    "IFK Vänersborg":9,
    117: 9,
    "IK Sirius":10,
    116: 10,
    "Bollnäs GIF":11,
    145: 11,
    "Vetlanda BK":12,
    133: 12,
    "Broberg/Söderhamn Bandy":13,
    209: 13,
    "Ljusdals BK":14,
    216: 14,
    "IFK Kungälv":15,
    153: 15,
    "Frillesås BK":16,
    "Nässjö IF":17,
    180: 17,
    "IFK Rättvik":18,
    "Tranås BoIS":19,
    "Gripen Trollhättan BK":20,
    146: 20,
    "Örebro SK":21,
    "GAIS": 4,
    116: 10,
    131: 23,
    124: 22,
    }


class ElitserienPipeline:
    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        team_id_keys = ['home_team_id', 'away_team_id']
        for key in team_id_keys:
            team = adapter.get(key)
            adapter[key] = teamIds[team]
        
        return item