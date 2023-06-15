import json

team_games = []

with open('team_game_data.json') as json_file:
    data = json.load(json_file)
    print(data[0])
    for game in data:
        
        home_team = {}
        away_team = {}
        home_team['gameId'] = game['gameId']
        away_team['gameId'] = game['gameId']
        home_team['team'] = game['homeTeam']['teamId']
        away_team['team'] = game['awayTeam']['teamId']
        home_team['opponent'] = game['awayTeam']['teamId']
        away_team['opponent'] = game['homeTeam']['teamId']
        home_team['goalsScored'] = game['homeGoal']
        away_team['goalsScored'] = game['awayGoal']
        home_team['goalsConceded'] = game['awayGoal']
        away_team['goalsConceded'] = game['homeGoal']
        home_team['goalDifference'] = game['homeGoal'] - game['awayGoal']
        away_team['goalDifference'] = game['awayGoal'] - game['homeGoal']
        if game['homeGoal'] > game['awayGoal']:
            home_team['points'] = 2
            away_team['points'] = 0
            home_team['win'] = True
            away_team['win'] = False
            home_team['draw'] = False
            away_team['draw'] = False
            home_team['lost'] = False
            away_team['lost'] = True
        if game['homeGoal'] < game['awayGoal']:
            home_team['points'] = 0
            away_team['points'] = 2
            home_team['win'] = False
            away_team['win'] = True
            home_team['draw'] = False
            away_team['draw'] = False
            home_team['lost'] = True
            away_team['lost'] = False
        if game['homeGoal'] == game['awayGoal']:
            home_team['points'] = 1
            away_team['points'] = 1
            home_team['win'] = False
            away_team['win'] = False
            home_team['draw'] = True
            away_team['draw'] = True
            home_team['lost'] = False
            away_team['lost'] = False
        if game['category'] == 'qualification':
            home_team['qualificationGame'] = True
            away_team['qualificationGame'] = True
        else:
            home_team['qualificationGame'] = False
            away_team['qualificationGame'] = False
        team_games.append(home_team)
        team_games.append(away_team)

with open('team_games.json', 'w') as outfile:
    json.dump(team_games, outfile)
            
        