import json
import locale
from datetime import datetime
from team_ids import *

locale.setlocale(locale.LC_ALL, 'sv_SE')


playoff = [
  ["semi","S1","1990-03-03 Västanfors Dam-AIK Dam 2-6"],
  ["semi","S2","1990-03-03 Boltic Dam-Sandviken Dam 3-2"],
  ["semi","S1","1990-03-10 AIK Dam-Västanfors Dam 3-3"],
  ["semi","S2","1990-03-10 Sandviken Dam-Boltic Dam 3-4"],
]

# qualification = [
#   "6 mars 2010 Karlsbyheden Dam-Uppsala Dam Dam Dam Dam Dam Dam 4-1",
#   "6 mars 2010 VSK Dam-Tranås Dam Dam Dam Dam 2-3",
#   "13 mars 2010 Tranås Dam Dam Dam Dam-VSK Dam 3-2",
#   "13 mars 2010 Uppsala Dam Dam Dam Dam Dam Dam-Karlsbyheden Dam 3-8"
# ]

output_file = 'dam198990.json'
seasonId = 136
games = []



format = '%d %B %Y'

# for game in damAllsvenskan:
#   game_data = {}
#   game_data['seasonId'] = seasonId
#   string_date = ' '.join(game.split(' ')[0:3])
#   game_data['date'] = datetime.strptime(string_date, format).date().strftime('%Y-%m-%d')
#   home_team = ' '.join(game.split('-')[0].split(' ')[3:])
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(game.split('-')[1].split(' ')[0:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   # halftime_result = game.split(' ')[-1][1:-1]
#   # game_data['halftimeResult'] = halftime_result
#   # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
#   # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
#   game_data['category'] = 'regular'
#   game_data['group'] = 'allsvenskan'
#   game_data['women'] = True  
#   games.append(game_data)

# for game in Div1Norr:
#   game_data = {}
#   game_data['seasonId'] = seasonId
#   date = game.split(' ')[0]
  
#   game_data['date'] = date
#   home_team = game[11:].split('-')[0]
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(game.split('-')[1].split(' ')[0:-1])
#   away_team = ' '.join(game[11:].split('-')[1].split(' ')[:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   game_data['category'] = 'regular'
#   game_data['group'] = 'Div1Norr'
#   game_data['women'] = True
    
#   games.append(game_data)


# for game in Div1Syd:
#   game_data = {}
#   game_data['seasonId'] = seasonId
#   date = game.split(' ')[0]
  
#   game_data['date'] = date
#   home_team = game[11:].split('-')[0]
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(game.split('-')[1].split(' ')[0:-1])
#   away_team = ' '.join(game[11:].split('-')[1].split(' ')[:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   game_data['category'] = 'regular'
#   game_data['group'] = 'Div1Syd'
#   game_data['women'] = True
    
#   games.append(game_data)


for game in playoff:
  game_data = {}
  actual_game = game[2]
  game_data['seasonId'] = seasonId
  date = actual_game.split(' ')[0]
  game_data['date'] = date
  home_team = actual_game[11:].split('-')[0]
  game_data['homeTeamId'] = teamIds[home_team]
  away_team = ' '.join(actual_game.split('-')[1].split(' ')[0:-1])
  away_team = ' '.join(actual_game[11:].split('-')[1].split(' ')[:-1])
  game_data['awayTeamId'] = teamIds[away_team]
  result = actual_game.split(' ')[-1]
  game_data['result'] = result
  game_data['homeGoal'] = int(result.split('-')[0])
  game_data['awayGoal'] = int(result.split('-')[1])
  # halftime_result = actual_game.split(' ')[-1][1:-1]
  # game_data['halftimeResult'] = halftime_result
  # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
  # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
  game_data['category'] = game[0]
  game_data['group'] = game[1]
  game_data['playoff'] = True
  game_data['women'] = True
    
  games.append(game_data)

# for game in qualification:
#   game_data = {}
#   game_data['seasonId'] = seasonId
#   string_date = ' '.join(game.split(' ')[0:3])
#   game_data['date'] = datetime.strptime(string_date, format).date().strftime('%Y-%m-%d')
#   home_team = ' '.join(game.split('-')[0].split(' ')[3:])
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(game.split('-')[1].split(' ')[0:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   # halftime_result = game.split(' ')[-1][1:-1]
#   # game_data['halftimeResult'] = halftime_result
#   # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
#   # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
#   game_data['category'] = 'qualification'
#   game_data['group'] = 'KvalA'
#   game_data['qualification'] = True
#   game_data['women'] = True  
#   games.append(game_data)


with open(output_file, 'w') as outputfile:
  json.dump(games, outputfile)

print('DONE!')