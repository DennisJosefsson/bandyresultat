with win_draw_lost_values as (
select 
	team,
	win, 
	"date",
	points,
	goal_difference,
	"year",
	teamgames.women as womens_table
from teamgames
join seasons on teamgames.season_id = seasons.season_id
where "year" = '2008/09' and category = 'regular')

select 
	team,
	win,
	"date",
	womens_table,
	sum(points) over (partition by team order by date) sum_points,
	sum(goal_difference) over (partition by team order by date) sum_gd,
	row_number() over (partition by team order by date)
from win_draw_lost_values;