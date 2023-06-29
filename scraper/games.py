import json
import locale
from datetime import datetime
from team_ids import *

locale.setlocale(locale.LC_ALL, 'sv_SE')

elitserien = [
  "27 oktober 2010 Villa Lidköping BK-Bollnäs GIF 8-6 (5-3)",
  "27 oktober 2010 IK Sirius-Sandvikens AIK 5-1 (4-1)",
  "28 oktober 2010 Västerås SK-IF Boltic 9-3 (5-1)",
  "29 oktober 2010 Bollnäs GIF-IK Sirius 5-4 (1-3)",
  "29 oktober 2010 Hammarby IF-Edsbyns IF 6-5 (1-1)",
  "29 oktober 2010 IFK Kungälv-Brobergs IF 2-7 (0-3)",
  "30 oktober 2010 IFK Vänersborg-Haparanda Tornio BK 4-5 (2-3)",
  "31 oktober 2010 Edsbyns IF-Vetlanda BK 11-4 (5-3)",
  "3 november 2010 Bollnäs-Kungälv 4-1 (1-1)",
  "3 november 2010 Boltic-Hammarby 2-10 (2-5)",
  "3 november 2010 Broberg-Sirius 5-4 (2-1)",
  "3 november 2010 Tillberga-Vänersborg 5-5 (2-3)",
  "3 november 2010 Vetlanda-Villa Lidköping 4-2 (3-1)",
  "3 november 2010 Sandviken-Västerås 3-1 (2-0)",
  "5 november 2010 Haparanda-Kungälv 3-4 (1-2)",
  "5 november 2010 Villa Lidköping-Boltic 11-0 (5-0)",
  "5 november 2010 Broberg-Västerås 4-3 (1-3)",
  "6 november 2010 Hammarby-Tillberga 6-6 (1-4)",
  "6 november 2010 Sandviken-Vänersborg 7-1 (3-1)",
  "7 november 2010 Boltic-Edsbyn 2-5 (1-4)",
  "7 november 2010 Vetlanda-Bollnäs 5-4 (4-2)",
  "10 november 2010 Sirius-Hammarby 5-9 (3-4)",
  "10 november 2010 Edsbyn-Sandviken 5-11 (3-4)",
  "10 november 2010 Haparanda-Boltic 5-6 (2-3)",
  "10 november 2010 Tillberga-Broberg 7-2 (5-2)",
  "12 november 2010 Vänersborg-Sirius 2-6 (0-1)",
  "12 november 2010 Hammarby-Västerås 2-5 (0-2)",
  "12 november 2010 Broberg-Vetlanda 3-3 (1-0)",
  "12 november 2010 Bollnäs-Haparanda 8-0 (4-0)",
  "13 november 2010 Edsbyn-Villa Lidköping 7-4 (2-3)",
  "14 november 2010 Västerås-Haparanda 9-3 (4-2)",
  "14 november 2010 Kungälv-Tillberga 7-0 (3-0)",
  "17 november 2010 Boltic-Kungälv 4-8 (2-5)",
  "17 november 2010 Sandviken-Villa Lidköping 5-6 (2-3)",
  "17 november 2010 Sirius-Edsbyn 0-6 (0-2)",
  "17 november 2010 Broberg-Hammarby 4-8 (2-2)",
  "17 november 2010 Västerås-Vänersborg 8-3 (3-2)",
  "19 november 2010 Kungälv-Sandviken 2-4 (2-1)",
  "19 november 2010 Villa Lidköping-Sirius 9-6 (4-3)",
  "19 november 2010 Vetlanda-Tillberga 6-1 (2-0)",
  "19 november 2010 Edsbyn-Västerås 6-2 (2-0)",
  "19 november 2010 Vänersborg-Hammarby 0-3 (0-1)",
  "21 november 2010 Tillberga-Villa Lidköping 3-8 (3-5)",
  "21 november 2010 Bollnäs-Boltic 13-6 (9-4)",
  "22 november 2010 Sirius-Kungälv 4-3 (2-2)",
  "24 november 2010 Boltic-Vetlanda 5-6 (2-2)",
  "24 november 2010 Västerås-Villa Lidköping 9-7 (5-4)",
  "24 november 2010 Sandviken-Bollnäs 8-2 (3-0)",
  "24 november 2010 Haparanda-Broberg 5-9 (1-5)",
  "26 november 2010 Haparanda-Sirius 5-5 (2-3)",
  "26 november 2010 Tillberga-Bollnäs 6-7 (4-6)",
  "26 november 2010 Kungälv-Västerås 3-2 (1-1)",
  "26 november 2010 Vänersborg-Edsbyn 3-2 (1-1)",
  "27 november 2010 Hammarby-Vetlanda 5-5 (2-3)",
  "27 november 2010 Sandviken-Boltic 17-3 (11-1)",
  "30 november 2010 Broberg-Vänersborg 6-2 (2-1)",
  "30 november 2010 Edsbyn-Tillberga 5-4 (2-2)",
  "30 november 2010 Vetlanda-Sandviken 4-7 (3-3)",
  "30 november 2010 Villa Lidköping-Haparanda 7-4 (3-2)",
  "8 december 2010 Boltic-Tillberga 3-3 (1-0)",
  "8 december 2010 Edsbyn-Broberg 2-4 (1-1)",
  "8 december 2010 Haparanda-Sandviken 2-10 (1-2)",
  "8 december 2010 Hammarby-Kungälv 8-0 (4-0)",
  "8 december 2010 Villa Lidköping-Vänersborg 8-6 (3-2)",
  "8 december 2010 Sirius-Vetlanda 3-3 (1-1)",
  "8 december 2010 Västerås-Bollnäs 4-5 (2-1)",
  "10 december 2010 Kungälv-Vänersborg 2-0 (0-0)",
  "10 december 2010 Broberg-Villa Lidköping 4-5 (2-1)",
  "10 december 2010 Vetlanda-Västerås 4-4 (2-2)",
  "10 december 2010 Tillberga-Haparanda 8-3 (4-1)",
  "10 december 2010 Bollnäs-Hammarby 1-3 (1-1)",
  "12 december 2010 Haparanda-Edsbyn 3-3 (0-2)",
  "12 december 2010 Sandviken-Tillberga 10-4 (3-1)",
  "15 december 2010 Sirius-Tillberga 1-2 (1-2)",
  "15 december 2010 Hammarby-Sandviken 7-9 (1-6)",
  "15 december 2010 Vänersborg-Boltic 13-3 (10-1)",
  "15 december 2010 Kungälv-Vetlanda 5-3 (3-1)",
  "17 december 2010 Bollnäs-Broberg 4-1 (1-3)",
  "18 december 2010 Västerås-Sirius 4-2 (3-2)",
  "18 december 2010 Edsbyn-Kungälv 5-2 (0-1)",
  "19 december 2010 Boltic-Broberg 5-7 (2-4)",
  "19 december 2010 Haparanda-Vetlanda 3-2 (1-1)",
  "19 december 2010 Vänersborg-Bollnäs 2-4 (1-0)",
  "20 december 2010 Villa Lidköping-Hammarby 8-3 (2-1)",
  "21 december 2010 Sandviken-Vetlanda 8-6 (2-4)",
  "22 december 2010 Västerås-Kungälv 2-4 (1-3)",
  "26 december 2010 Tillberga-Västerås 2-4 (1-1)",
  "26 december 2010 Kungälv-Villa Lidköping 3-4 (1-1)",
  "26 december 2010 Vetlanda-Vänersborg 3-2 (1-2)",
  "26 december 2010 Sandviken-Broberg 9-6 (4-4)",
  "26 december 2010 Haparanda-Hammarby 6-4 (3-3)",
  "28 december 2010 Edsbyn-Vänersborg 4-3 (2-3)",
  "28 december 2010 Boltic-Haparanda 5-7 (2-3)",
  "28 december 2010 Hammarby-Villa Lidköping 3-0 (2-0)",
  "28 december 2010 Broberg-Tillberga 7-3 (5-1)",
  "30 december 2010 Hammarby-Bollnäs 2-1 (1-1)",
  "30 december 2010 Västerås-Vetlanda 2-5 (1-0)",
  "30 december 2010 Broberg-Boltic 7-3 (3-1)",
  "30 december 2010 Sirius-Haparanda 7-3 (4-2)",
  "30 december 2010 Vänersborg-Kungälv 5-3 (3-1)",
  "2 januari 2011 Boltic-Sandviken 0-14 (0-7)",
  "2 januari 2011 Haparanda-Västerås 1-0 (1-0)",
  "2 januari 2011 Tillberga-Sirius 3-1 (2-0)",
  "2 januari 2011 Vetlanda-Hammarby 5-8 (3-0)",
  "2 januari 2011 Kungälv-Edsbyn 1-5 (0-1)",
  "2 januari 2011 Villa Lidköping-Broberg 5-3 (2-2)",
  "2 januari 2011 Bollnäs-Vänersborg 9-3 (4-0)",
  "4 januari 2011 Bollnäs-Edsbyn 1-3 (0-1)",
  "6 januari 2011 Sirius-Boltic 6-2 (3-0)",
  "6 januari 2011 Västerås-Tillberga 7-6 (4-4)",
  "6 januari 2011 Edsbyn-Bollnäs 4-6 (0-4)",
  "6 januari 2011 Villa Lidköping-Kungälv 6-5 (5-1)",
  "6 januari 2011 Vänersborg-Vetlanda 4-6 (1-4)",
  "6 januari 2011 Hammarby-Haparanda 8-4 (3-3)",
  "6 januari 2011 Broberg-Sandviken 2-5 (1-2)",
  "8 januari 2011 Sandviken-Haparanda 14-4 (6-2)",
  "9 januari 2011 Tillberga-Boltic 16-3 (8-1)",
  "9 januari 2011 Kungälv-Hammarby 7-4 (2-1)",
  "9 januari 2011 Bollnäs-Västerås 7-2 (2-2)",
  "9 januari 2011 Vetlanda-Sirius 3-3 (1-3)",
  "9 januari 2011 Broberg-Edsbyn 6-4 (5-2)",
  "10 januari 2011 Vänersborg-Villa Lidköping 5-2 (2-1)",
  "12 januari 2011 Bollnäs-Sandviken 10-3 (7-1)",
  "12 januari 2011 Hammarby-Vänersborg 4-4 (3-2)",
  "12 januari 2011 Vetlanda-Boltic 12-1 (3-0)",
  "12 januari 2011 Haparanda-Tillberga 3-3 (3-1)",
  "12 januari 2011 Villa Lidköping-Västerås 5-5 (1-3)",
  "12 januari 2011 Kungälv-Sirius 4-4 (3-3)",
  "14 januari 2011 Vänersborg-Broberg 5-3 (1-1)",
  "14 januari 2011 Edsbyn-Hammarby 6-1 (3-1)",
  "15 januari 2011 Tillberga-Vetlanda 9-6 (4-3)",
  "15 januari 2011 Sirius-Villa Lidköping 5-4 (2-3)",
  "15 januari 2011 Sandviken-Kungälv 6-2 (2-2)",
  "16 januari 2011 Västerås-Edsbyn 6-4 (2-2)",
  "16 januari 2011 Boltic-Bollnäs 4-6 (2-3)",
  "18 januari 2011 Vänersborg-Västerås 5-5 (1-2)",
  "18 januari 2011 Hammarby-Broberg 6-7 (4-1)",
  "18 januari 2011 Edsbyn-Sirius 7-3 (3-2)",
  "18 januari 2011 Bollnäs-Tillberga 5-5 (1-0)",
  "18 januari 2011 Villa Lidköping-Sandviken 5-11 (4-4)",
  "1 februari 2011 Sirius-Vänersborg 7-0 (2-0)",
  "2 februari 2011 Sandviken-Edsbyn 9-4 (6-0)",
  "2 februari 2011 Boltic-Villa Lidköping 1-10 (1-4)",
  "2 februari 2011 Tillberga-Kungälv 4-6 (3-3)",
  "2 februari 2011 Haparanda-Bollnäs 0-4 (0-0)",
  "2 februari 2011 Vetlanda-Broberg 5-8 (2-5)",
  "4 februari 2011 Boltic-Sirius 3-4 (3-2)",
  "4 februari 2011 Vetlanda-Haparanda 6-5 (5-2)",
  "4 februari 2011 Tillberga-Sandviken 5-5 (1-3)",
  "5 februari 2011 Villa Lidköping-Edsbyn 5-6 (1-3)",
  "6 februari 2011 Sirius-Bollnäs 4-1 (2-0)",
  "6 februari 2011 Broberg-Haparanda 10-3 (6-1)",
  "6 februari 2011 Västerås-Hammarby 4-4 (0-2)",
  "6 februari 2011 Kungälv-Boltic 5-1 (3-1)",
  "8 februari 2011 Kungälv-Haparanda 5-0 (1-0)",
  "9 februari 2011 Villa Lidköping-Tillberga 8-7 (3-1)",
  "9 februari 2011 Vänersborg-Sandviken 1-5 (0-0)",
  "9 februari 2011 Edsbyn-Boltic 10-2 (5-2)",
  "9 februari 2011 Hammarby-Sirius 4-6 (1-2)",
  "9 februari 2011 Bollnäs-Vetlanda 7-4 (3-3)",
  "9 februari 2011 Västerås-Broberg 5-2 (3-2)",
  "11 februari 2011 Vetlanda-Kungälv 2-2 (1-1)",
  "11 februari 2011 Broberg-Bollnäs 4-6 (1-4)",
  "11 februari 2011 Boltic-Vänersborg 5-5 (3-1)",
  "12 februari 2011 Haparanda-Villa Lidköping 1-5 (1-3)",
  "12 februari 2011 Tillberga-Edsbyn 5-7 (1-2)",
  "12 februari 2011 Sandviken-Hammarby 2-6 (1-3)",
  "13 februari 2011 Sirius-Västerås 7-2 (3-0)",
  "16 februari 2011 Edsbyn-Haparanda 7-2 (3-2)",
  "16 februari 2011 Kungälv-Bollnäs 3-4 (2-3)",
  "16 februari 2011 Västerås-Sandviken 4-4 (2-2)",
  "16 februari 2011 Hammarby-Boltic 13-1 (6-1)",
  "16 februari 2011 Vänersborg-Tillberga 5-2 (4-1)",
  "16 februari 2011 Villa Lidköping-Vetlanda 14-4 (6-3)",
  "16 februari 2011 Sirius-Broberg 4-2 (2-1)",
  "18 februari 2011 Sandviken-Sirius 12-3 (8-0)",
  "18 februari 2011 Bollnäs-Villa Lidköping 5-2 (0-1)",
  "18 februari 2011 Tillberga-Hammarby 4-4 (2-2)",
  "18 februari 2011 Broberg-Kungälv 5-1 (1-1)",
  "18 februari 2011 Boltic-Västerås 1-5 (1-1)",
  "18 februari 2011 Vetlanda-Edsbyn 7-7 (4-6)",
  "19 februari 2011 Haparanda-Vänersborg 5-2 (2-0)"
]

output_file = '201011.json'
seasonId = 105
games = []



format = '%d %B %Y'

for game in elitserien:
    game_data = {}
    game_data['seasonId'] = seasonId
    string_date = ' '.join(game.split(' ')[0:3])
    game_data['date'] = datetime.strptime(string_date, format).date().strftime('%Y-%m-%d')
    home_team = ' '.join(game.split('-')[0].split(' ')[3:])
    game_data['homeTeamId'] = teamIds[home_team]
    away_team = ' '.join(game.split('-')[1].split(' ')[0:-1])
    game_data['awayTeamId'] = teamIds[away_team]
    result = game.split(' ')[-2]
    game_data['result'] = result
    game_data['homeGoal'] = int(result.split('-')[0])
    game_data['awayGoal'] = int(result.split('-')[1])
    halftime_result = game.split(' ')[-1][1:-1]
    game_data['halftimeResult'] = halftime_result
    game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
    game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
    game_data['category'] = 'regular'
    game_data['group'] = 'elitserien'
        
    games.append(game_data)

# for game in elitserien:
#     game_data = {}
#     game_data['seasonId'] = seasonId
#     game_data['date'] = datetime.strptime(game['date'], format).date().strftime('%Y-%m-%d')
#     home_team = game['match'].split('-')[0]
#     game_data['homeTeamId'] = teamIds[home_team]
#     away_team = game['match'].split('-')[1]
#     game_data['awayTeamId'] = teamIds[away_team]
#     result = game['result']
#     game_data['result'] = result
#     game_data['homeGoal'] = int(result.split('-')[0])
#     game_data['awayGoal'] = int(result.split('-')[1])
#     game_data['category'] = 'regular'
#     game_data['group'] = 'elitserien'
        
#     games.append(game_data)


# for game in playoff:
#     actual_game = game[2]
#     game_data = {}
#     game_data['seasonId'] = seasonId
#     string_date = ' '.join(actual_game.split(' ')[0:3])
#     game_data['date'] = datetime.strptime(string_date, format).date().strftime('%Y-%m-%d')
#     # print(datetime.strptime(string_date, format).date().strftime('%Y-%m-%d'))
#     home_team = ' '.join(actual_game.split('-')[0].split(' ')[3:])
#     game_data['homeTeamId'] = teamIds[home_team]
#     away_team = ' '.join(actual_game.split('-')[1].split(' ')[0:-1])
#     game_data['awayTeamId'] = teamIds[away_team]
#     result = actual_game.split(' ')[-1]
#     game_data['result'] = result
#     game_data['homeGoal'] = int(result.split('-')[0])
#     game_data['awayGoal'] = int(result.split('-')[1])
#     # halftime_result = actual_game.split(' ')[-1][1:-1]
#     # game_data['halftimeResult'] = halftime_result
#     # game_data['halftimeHomeGoal'] = int(halftime_result.split('-')[0])
#     # game_data['halftimeAwayGoal'] = int(halftime_result.split('-')[1])
#     game_data['category'] = game[0]
#     game_data['group'] = game[1]
#     game_data['playoff'] = True
        
#     games.append(game_data)

with open(output_file, 'w') as outputfile:
    json.dump(games, outputfile)

print('DONE!')