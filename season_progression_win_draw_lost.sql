with win_draw_lost_values as (
select 
	team,
	win, 
	"date",
	case when win = true then 1 else 0 end win_value,
	case when draw = true then 1 else 0 end draw_value,
	case when lost = true then 1 else 0 end lost_value
from teamgames
where season_id = 108 and category = 'regular')

select 
	team,
	win,
	"date",
	sum(win_value) over (partition by team order by date) sum_wins,
	sum(draw_value) over (partition by team order by date) sum_draws,
	sum(lost_value) over (partition by team order by date) sum_lost,
	row_number() over (partition by team order by date)
from win_draw_lost_values;