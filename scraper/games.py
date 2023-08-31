import json
import locale
from datetime import datetime
from team_ids import *

locale.setlocale(locale.LC_ALL, 'sv_SE')


# playoff = [
#   ["semi","S1","1990-03-03 Västanfors Dam-AIK Dam 2-6"],
#   ["semi","S2","1990-03-03 Boltic Dam-Sandviken Dam 3-2"],
#   ["semi","S1","1990-03-10 AIK Dam-Västanfors Dam 3-3"],
#   ["semi","S2","1990-03-10 Sandviken Dam-Boltic Dam 3-4"],
# ]

qualification = [
["qualification","KvalA","1996-02-27 Surte-Katrineholm 4-4"],
 ["qualification","KvalA","1996-02-27 Tranås-Örebro 8-3"],
 ["qualification","KvalB","1996-02-27 Västanfors-Hammarby 4-6"],
 ["qualification","KvalB","1996-02-27 Selånger-Karlsborg 3-4"],
 ["qualification","KvalA","1996-02-29 Örebro-Surte 5-6"],
 ["qualification","KvalA","1996-02-29 Katrineholm-Tranås 3-7"],
 ["qualification","KvalB","1996-02-29 Hammarby-Selånger 4-4"],
 ["qualification","KvalB","1996-02-29 Karlsborg-Västanfors 8-6"],
 ["qualification","KvalA","1996-03-02 Örebro-Katrineholm 10-7"],
 ["qualification","KvalA","1996-03-02 Tranås-Surte 4-5"],
 ["qualification","KvalB","1996-03-02 Karlsborg-Hammarby 3-4"],
 ["qualification","KvalB","1996-03-02 Selånger-Västanfors 6-6"],
 ["qualification","KvalA","1996-03-05 Surte-Tranås 5-6"],
 ["qualification","KvalA","1996-03-05 Katrineholm-Örebro 11-0"],
 ["qualification","KvalB","1996-03-05 Hammarby-Karlsborg 6-4"],
 ["qualification","KvalB","1996-03-05 Västanfors-Selånger 4-6"],
 ["qualification","KvalA","1996-03-07 Surte-Örebro 4-1"],
 ["qualification","KvalA","1996-03-07 Tranås-Katrineholm 0-4"],
 ["qualification","KvalB","1996-03-07 Selånger-Hammarby 4-3"],
 ["qualification","KvalB","1996-03-07 Västanfors-Karlsborg 4-8"],
 ["qualification","KvalA","1996-03-09 Katrineholm-Surte 5-3"],
 ["qualification","KvalA","1996-03-09 Örebro-Tranås 4-6"],
 ["qualification","KvalB","1996-03-09 Karlsborg-Selånger 8-3"],
 ["qualification","KvalB","1996-03-09 Hammarby-Västanfors 9-3"],
]


 




output_file = 'menkval9596.json'
seasonId = 90
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


# for game in playoff:
#   game_data = {}
#   actual_game = game[2]
#   game_data['seasonId'] = seasonId
#   date = actual_game.split(' ')[0]
#   game_data['date'] = date
#   home_team = actual_game[11:].split('-')[0]
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(actual_game.split('-')[1].split(' ')[0:-1])
#   away_team = ' '.join(actual_game[11:].split('-')[1].split(' ')[:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = actual_game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   # halftime_result = actual_game.split(' ')[-1][1:-1]
#   # game_data['halftimeResult'] = halftime_result
#   # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
#   # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
#   game_data['category'] = game[0]
#   game_data['group'] = game[1]
#   game_data['playoff'] = True
#   game_data['women'] = True
    
#   games.append(game_data)

for game in qualification:
  game_data = {}
  actual_game = game[2]
  game_data['seasonId'] = seasonId
  
  game_data['date'] = actual_game.split(' ')[0]
  home_team = actual_game[11:].split('-')[0]
  game_data['homeTeamId'] = teamIds[home_team]
  away_team = ' '.join(actual_game[11:].split('-')[1].split(' ')[:-1])
  game_data['awayTeamId'] = teamIds[away_team]
  result = actual_game.split(' ')[-1]
  game_data['result'] = result
  game_data['homeGoal'] = int(result.split('-')[0])
  game_data['awayGoal'] = int(result.split('-')[1])
  # halftime_result = game.split(' ')[-1][1:-1]
  # game_data['halftimeResult'] = halftime_result
  # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
  # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
  game_data['category'] = 'qualification'
  game_data['group'] = game[1]
  game_data['qualification'] = True
  game_data['women'] = False  
  games.append(game_data)


with open(output_file, 'w') as outputfile:
  json.dump(games, outputfile)

print('DONE!')