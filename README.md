# Bandyresultat

The goal of this project is to launch a site that gathers all the results from the top flights - men and women - in Swedish [bandy](https://en.wikipedia.org/wiki/Bandy). At the moment the data is incomplete. A lot of it is missing and needs to be re-discovered by digging through the historical records, such as old newspapers. The data that do exist is scattered around the web at various places, and some sites that barely exist anymore.

The project consists of three parts: A backend based on node.js, express and PostgreSQL, a React frontend, and a web-scraper (programming language TBD, probably Python).

# Finished site

https://bandyresultat.se

# Features

1. Tables and list of games for individual seasons, and statistics.
2. Tables for individual teams, statistics such as win streaks (calculated by SQL queries)
3. H2H comparisons between 2-4 teams. Either based on all games and seasons, or the user can pick a specific range of seasons and/or specific categories (regular season, playoff stages, qualification).
4. Table for all seasons combined.

# Notes

The available online data weren't uniform enough to use a web scraper. Instead I relied on entering data manually and having python scripts that read strings stored in list.
