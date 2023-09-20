import json
import locale
from datetime import datetime
from team_ids import *

locale.setlocale(locale.LC_ALL, 'sv_SE')




ElitserienDam2324 = [
"RättvikDamer Sunvära 2023-10-28","KSBandy VSKDam 2023-10-28","SandvikenDam Mölndal 2023-10-28","VillaDam UppsalaDam 2023-10-28","KSBandy Sunvära 2023-11-04","VillaDam RättvikDamer 2023-11-04","SandvikenDam Skirö 2023-11-05","RättvikDamer Mölndal 2023-11-11","SandvikenDam VillaDam 2023-11-11","Sunvära VSKDam 2023-11-11","UppsalaDam Skirö 2023-11-11","RättvikDamer VillaDam 2023-11-12","RättvikDamer UppsalaDam 2023-11-18","Skirö Mölndal 2023-11-18","VillaDam KSBandy 2023-11-18","VSKDam SandvikenDam 2023-11-19","Mölndal Sunvära 2023-11-24","SandvikenDam KSBandy 2023-11-24","Skirö VillaDam 2023-11-25","UppsalaDam VSKDam 2023-11-25","KSBandy RättvikDamer 2023-12-02","Sunvära UppsalaDam 2023-12-02","VillaDam Mölndal 2023-12-02","VSKDam Skirö 2023-12-02","Mölndal UppsalaDam 2023-12-03","Sunvära RättvikDamer 2023-12-03","Skirö KSBandy 2023-12-13","Sunvära VillaDam 2023-12-13","UppsalaDam SandvikenDam 2023-12-13","RättvikDamer Skirö 2023-12-16","KSBandy UppsalaDam 2023-12-16","Mölndal VSKDam 2023-12-16","SandvikenDam Sunvära 2023-12-17","VSKDam RättvikDamer 2023-12-20","RättvikDamer SandvikenDam 2023-12-26","Mölndal KSBandy 2023-12-26","Skirö Sunvära 2023-12-26","VillaDam VSKDam 2023-12-26","KSBandy Skirö 2023-12-30","UppsalaDam VillaDam 2023-12-30","VSKDam Mölndal 2023-12-30","RättvikDamer KSBandy 2024-01-06","Mölndal Skirö 2024-01-06","UppsalaDam Sunvära 2024-01-06","VillaDam SandvikenDam 2024-01-06","Mölndal VillaDam 2024-01-13","SandvikenDam UppsalaDam 2024-01-13","Skirö VSKDam 2024-01-13","Sunvära KSBandy 2024-01-13","KSBandy SandvikenDam 2024-01-20","Skirö RättvikDamer 2024-01-20","UppsalaDam Mölndal 2024-01-20","VSKDam Sunvära 2024-01-21",
"KSBandy Mölndal 2024-01-27","Sunvära Skirö 2024-01-28","SandvikenDam VSKDam 2024-01-31","Mölndal SandvikenDam 2024-02-03","UppsalaDam RättvikDamer 2024-02-03","VillaDam Skirö 2024-02-03","VSKDam KSBandy 2024-02-03","Mölndal RättvikDamer 2024-02-10","Skirö SandvikenDam 2024-02-10","VillaDam Sunvära 2024-02-10","VSKDam UppsalaDam 2024-02-10","SandvikenDam RättvikDamer 2024-02-17","Sunvära Mölndal 2024-02-17","UppsalaDam KSBandy 2024-02-17","VSKDam VillaDam 2024-02-17","RättvikDamer VSKDam 2024-02-24","KSBandy VillaDam 2024-02-24","Skirö UppsalaDam 2024-02-24","Sunvära SandvikenDam 2024-02-24"
]


 




output_file = 'elitserienDam2324.json'
seasonId = 171
serieId = 1238
games = []



format = '%d %B %Y'

# for game in damAllsvenskanNorr:
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
#   game_data['group'] = 'DamAllsvNorr'
#   game_data['serieId'] = 1164
#   game_data['women'] = True  
#   games.append(game_data)

# for game in damAllsvenskanSyd:
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
#   game_data['group'] = 'DamAllsvSyd'
#   game_data['serieId'] = 1165
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

# for game in qualification:
#   game_data = {}
#   actual_game = game[2]
#   game_data['seasonId'] = seasonId
  
#   game_data['date'] = actual_game.split(' ')[0]
#   home_team = actual_game[11:].split('-')[0]
#   game_data['homeTeamId'] = teamIds[home_team]
#   away_team = ' '.join(actual_game[11:].split('-')[1].split(' ')[:-1])
#   game_data['awayTeamId'] = teamIds[away_team]
#   result = actual_game.split(' ')[-1]
#   game_data['result'] = result
#   game_data['homeGoal'] = int(result.split('-')[0])
#   game_data['awayGoal'] = int(result.split('-')[1])
#   # halftime_result = game.split(' ')[-1][1:-1]
#   # game_data['halftimeResult'] = halftime_result
#   # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
#   # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
#   game_data['category'] = 'qualification'
#   game_data['group'] = game[1]
#   game_data['qualification'] = True
#   game_data['women'] = False  
#   games.append(game_data)

for game in ElitserienDam2324:
  game_data = {}
  game_data['homeTeamId'] = teamIds[game.split(' ')[0]]
  game_data['awayTeamId'] = teamIds[game.split(' ')[1]]
  game_data['date'] = game.split(' ')[2]
  print(game.split(' ')[2])
  game_data['serieId'] = serieId
  game_data['seasonId'] = seasonId
  game_data['group'] = 'elitserien'
  game_data['category'] = 'regular'
  game_data['played'] = False
  game_data['women'] = True
  game_data['qualification'] = False
  games.append(game_data)
  


with open(output_file, 'w') as outputfile:
  json.dump(games, outputfile)

print('DONE!')