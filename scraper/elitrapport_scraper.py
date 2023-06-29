import urllib.request
import json
from team_ids import *

scraped_data = []

# teamIds = {
#     "Villa Lidköping BK":1,
#     "115": 1,
#     "Hammarby IF":2,
#     "117": 2,
#     "IFK Motala":3,
#     "GAIS Bandy":4,
#     "130": 4,
#     "Västerås SK":5,
#     "132": 5,
#     "Edsbyns IF":6,
#     "114": 6,
#     "Kalix BF":7,
#     "181": 7,
#     "Sandvikens AIK":8,
#     "137": 8,
#     "IFK Vänersborg":9,
#     "171": 9,
#     "IK Sirius":10,
#     "116": 10,
#     "Bollnäs GIF":11,
#     "145": 11,
#     "Vetlanda BK":12,
#     "133": 12,
#     "Broberg/Söderhamn Bandy":13,
#     "209": 13,
#     "Ljusdals BK":14,
#     "216": 14,
#     "IFK Kungälv":15,
#     "153": 15,
#     "Frillesås BK":16,
#     "Nässjö IF":17,
#     "180": 17,
#     "IFK Rättvik":18,
#     "Tranås BoIS":19,
#     "Gripen Trollhättan BK":20,
#     "146": 20,
#     "Örebro SK":21,
#     "GAIS": 4,
#     "131": 23,
#     "124": 22,
#     }


seasonId = 117
outputfile = '202223.json'


urls = [ "https://www.elitrapport.se/api/games.php?pgsid=11829&season=2022"
        
      ]

for url in urls: 
    response = urllib.request.urlopen(url)
    game_data = response.read()[9:-1]
    games = json.loads(game_data)
    for game in games:
        game_items = {}
        if game['Serie'] == 'Elitserien Herr Träningsmatcher':
             continue
        game_items['date'] = game['Date'].split(' ')[0]
        game_items['homeTeamId'] = teamIds[game['HomeID']]
        game_items['awayTeamId'] = teamIds[game['AwayID']]
        game_items['result'] = game['HomeGoals'] + '-' + game['AwayGoals']
        game_items['homeGoal'] = int(game['HomeGoals'])
        game_items['awayGoal'] = int(game['AwayGoals'])
        game_items['seasonId'] = seasonId
        if game['Serie'] == 'Elitserien Herr': 
            game_items['category'] = 'regular'
            game_items['group'] = 'elitserien'
            game_items['playoff'] = False
        if game['Serie'] == 'Elitserien Herr Kval': 
            game_items['category'] = 'qualification'
            game_items['group'] = 'KvalA'
            game_items['playoff'] = False
        if game['Serie'] == 'Elitserien Herr Åttondel': 
            game_items['category'] = 'eight'
            game_items['group'] = 'E1'
            game_items['playoff'] = True
        if game['Serie'] == 'Elitserien Herr Kvart': 
            game_items['category'] = 'quarter'
            game_items['group'] = 'Q1'
            game_items['playoff'] = True
        if game['Serie'] == 'Elitserien Herr Semi': 
            game_items['category'] = 'semi'
            game_items['group'] = 'S1'
            game_items['playoff'] = True
        if game['Serie'] == 'Elitserien Herr Final': 
            game_items['category'] = 'final'
            game_items['group'] = 'final'
            game_items['playoff'] = True
        
        game_url = f"https://2-dot-elitrapport-api.appspot.com/API/gameevent.php?gid={game['GameID']}&output=json"

        game_response = urllib.request.urlopen(game_url)
        home_goals = 0
        away_goals = 0
        

        game_events = game_response.read()[14:-1]
        game_event_data = json.loads(game_events)
        
        for data in game_event_data:
            
            if data['Period'] == '1' and data['Homegoal'] == '1':
                home_goals += 1
            if data['Period'] == '1' and data['Awaygoal'] == '1':
                away_goals += 1
        game_items['halftimeResult'] = str(home_goals) + '-' + str(away_goals)
        game_items['halftimeHomeGoal'] = home_goals
        game_items['halftimeAwayGoal'] = away_goals
      
        scraped_data.append(game_items)

with open(outputfile, "w") as outfile:
    json.dump(scraped_data, outfile)