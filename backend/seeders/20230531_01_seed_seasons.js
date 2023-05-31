module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('seasons', [
      { year: '1906/1907' },
      { year: '1907/1908' },
      { year: '1908/1909' },
      { year: '1909/1910' },
      { year: '1910/1911' },
      { year: '1911/1912' },
      { year: '1912/1913' },
      { year: '1913/1914' },
      { year: '1914/1915' },
      { year: '1915/1916' },
      { year: '1916/1917' },
      { year: '1917/1918' },
      { year: '1918/1919' },
      { year: '1919/1920' },
      { year: '1920/1921' },
      { year: '1921/1922' },
      { year: '1922/1923' },
      { year: '1923/1924' },
      { year: '1924/1925' },
      { year: '1925/1926' },
      { year: '1926/1927' },
      { year: '1927/1928' },
      { year: '1928/1929' },
      { year: '1929/1930' },
      { year: '1930/1931' },
      { year: '1931/1932' },
      { year: '1932/1933' },
      { year: '1933/1934' },
      { year: '1934/1935' },
      { year: '1935/1936' },
      { year: '1936/1937' },
      { year: '1937/1938' },
      { year: '1938/1939' },
      { year: '1939/1940' },
      { year: '1940/1941' },
      { year: '1941/1942' },
      { year: '1942/1943' },
      { year: '1943/1944' },
      { year: '1944/1945' },
      { year: '1945/1946' },
      { year: '1946/1947' },
      { year: '1947/1948' },
      { year: '1948/1949' },
      { year: '1949/1950' },
      { year: '1950/1951' },
      { year: '1951/1952' },
      { year: '1952/1953' },
      { year: '1953/1954' },
      { year: '1954/1955' },
      { year: '1955/1956' },
      { year: '1956/1957' },
      { year: '1957/1958' },
      { year: '1958/1959' },
      { year: '1959/1960' },
      { year: '1960/1961' },
      { year: '1961/1962' },
      { year: '1962/1963' },
      { year: '1963/1964' },
      { year: '1964/1965' },
      { year: '1965/1966' },
      { year: '1966/1967' },
      { year: '1967/1968' },
      { year: '1968/1969' },
      { year: '1969/1970' },
      { year: '1970/1971' },
      { year: '1971/1972' },
      { year: '1972/1973' },
      { year: '1973/1974' },
      { year: '1974/1975' },
      { year: '1975/1976' },
      { year: '1976/1977' },
      { year: '1977/1978' },
      { year: '1978/1979' },
      { year: '1979/1980' },
      { year: '1980/1981' },
      { year: '1981/1982' },
      { year: '1982/1983' },
      { year: '1983/1984' },
      { year: '1984/1985' },
      { year: '1985/1986' },
      { year: '1986/1987' },
      { year: '1987/1988' },
      { year: '1988/1989' },
      { year: '1989/1990' },
      { year: '1990/1991' },
      { year: '1991/1992' },
      { year: '1992/1993' },
      { year: '1993/1994' },
      { year: '1994/1995' },
      { year: '1995/1996' },
      { year: '1996/1997' },
      { year: '1997/1998' },
      { year: '1998/1999' },
      { year: '1999/2000' },
      { year: '2000/2001' },
      { year: '2001/2002' },
      { year: '2002/2003' },
      { year: '2003/2004' },
      { year: '2004/2005' },
      { year: '2005/2006' },
      { year: '2006/2007' },
      { year: '2007/2008' },
      { year: '2008/2009' },
      { year: '2009/2010' },
      { year: '2010/2011' },
      { year: '2011/2012' },
      { year: '2012/2013' },
      { year: '2013/2014' },
      { year: '2014/2015' },
      { year: '2015/2016' },
      { year: '2016/2017' },
      { year: '2017/2018' },
      { year: '2018/2019' },
      { year: '2019/2020' },
      { year: '2020/2021' },
      { year: '2021/2022' },
      { year: '2022/2023' },
      { year: '1971/1972', women: true },
      { year: '1972/1973', women: true },
      { year: '1973/1974', women: true },
      { year: '1974/1975', women: true },
      { year: '1975/1976', women: true },
      { year: '1976/1977', women: true },
      { year: '1977/1978', women: true },
      { year: '1978/1979', women: true },
      { year: '1979/1980', women: true },
      { year: '1980/1981', women: true },
      { year: '1981/1982', women: true },
      { year: '1982/1983', women: true },
      { year: '1983/1984', women: true },
      { year: '1984/1985', women: true },
      { year: '1985/1986', women: true },
      { year: '1986/1987', women: true },
      { year: '1987/1988', women: true },
      { year: '1988/1989', women: true },
      { year: '1989/1990', women: true },
      { year: '1990/1991', women: true },
      { year: '1991/1992', women: true },
      { year: '1992/1993', women: true },
      { year: '1993/1994', women: true },
      { year: '1994/1995', women: true },
      { year: '1995/1996', women: true },
      { year: '1996/1997', women: true },
      { year: '1997/1998', women: true },
      { year: '1998/1999', women: true },
      { year: '1999/2000', women: true },
      { year: '2000/2001', women: true },
      { year: '2001/2002', women: true },
      { year: '2002/2003', women: true },
      { year: '2003/2004', women: true },
      { year: '2004/2005', women: true },
      { year: '2005/2006', women: true },
      { year: '2006/2007', women: true },
      { year: '2007/2008', women: true },
      { year: '2008/2009', women: true },
      { year: '2009/2010', women: true },
      { year: '2010/2011', women: true },
      { year: '2011/2012', women: true },
      { year: '2012/2013', women: true },
      { year: '2013/2014', women: true },
      { year: '2014/2015', women: true },
      { year: '2015/2016', women: true },
      { year: '2016/2017', women: true },
      { year: '2017/2018', women: true },
      { year: '2018/2019', women: true },
      { year: '2019/2020', women: true },
      { year: '2020/2021', women: true },
      { year: '2021/2022', women: true },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('seasons')
  },
}
