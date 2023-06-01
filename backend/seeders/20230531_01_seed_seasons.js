module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('seasons', [
      { year: '1906/1907', women: false },
      { year: '1907/1908', women: false },
      { year: '1909/1910', women: false },
      { year: '1908/1909', women: false },
      { year: '1910/1911', women: false },
      { year: '1911/1912', women: false },
      { year: '1912/1913', women: false },
      { year: '1913/1914', women: false },
      { year: '1914/1915', women: false },
      { year: '1915/1916', women: false },
      { year: '1916/1917', women: false },
      { year: '1917/1918', women: false },
      { year: '1918/1919', women: false },
      { year: '1919/1920', women: false },
      { year: '1920/1921', women: false },
      { year: '1921/1922', women: false },
      { year: '1922/1923', women: false },
      { year: '1923/1924', women: false },
      { year: '1924/1925', women: false },
      { year: '1925/1926', women: false },
      { year: '1926/1927', women: false },
      { year: '1927/1928', women: false },
      { year: '1928/1929', women: false },
      { year: '1929/1930', women: false },
      { year: '1930/1931', women: false },
      { year: '1931/1932', women: false },
      { year: '1932/1933', women: false },
      { year: '1933/1934', women: false },
      { year: '1934/1935', women: false },
      { year: '1935/1936', women: false },
      { year: '1936/1937', women: false },
      { year: '1937/1938', women: false },
      { year: '1938/1939', women: false },
      { year: '1939/1940', women: false },
      { year: '1940/1941', women: false },
      { year: '1941/1942', women: false },
      { year: '1942/1943', women: false },
      { year: '1943/1944', women: false },
      { year: '1944/1945', women: false },
      { year: '1945/1946', women: false },
      { year: '1946/1947', women: false },
      { year: '1947/1948', women: false },
      { year: '1948/1949', women: false },
      { year: '1949/1950', women: false },
      { year: '1950/1951', women: false },
      { year: '1951/1952', women: false },
      { year: '1952/1953', women: false },
      { year: '1953/1954', women: false },
      { year: '1954/1955', women: false },
      { year: '1955/1956', women: false },
      { year: '1956/1957', women: false },
      { year: '1957/1958', women: false },
      { year: '1958/1959', women: false },
      { year: '1959/1960', women: false },
      { year: '1960/1961', women: false },
      { year: '1961/1962', women: false },
      { year: '1962/1963', women: false },
      { year: '1963/1964', women: false },
      { year: '1964/1965', women: false },
      { year: '1965/1966', women: false },
      { year: '1966/1967', women: false },
      { year: '1967/1968', women: false },
      { year: '1968/1969', women: false },
      { year: '1969/1970', women: false },
      { year: '1970/1971', women: false },
      { year: '1971/1972', women: false },
      { year: '1972/1973', women: false },
      { year: '1973/1974', women: false },
      { year: '1974/1975', women: false },
      { year: '1975/1976', women: false },
      { year: '1976/1977', women: false },
      { year: '1977/1978', women: false },
      { year: '1978/1979', women: false },
      { year: '1979/1980', women: false },
      { year: '1980/1981', women: false },
      { year: '1981/1982', women: false },
      { year: '1982/1983', women: false },
      { year: '1983/1984', women: false },
      { year: '1984/1985', women: false },
      { year: '1985/1986', women: false },
      { year: '1986/1987', women: false },
      { year: '1987/1988', women: false },
      { year: '1988/1989', women: false },
      { year: '1989/1990', women: false },
      { year: '1990/1991', women: false },
      { year: '1991/1992', women: false },
      { year: '1992/1993', women: false },
      { year: '1993/1994', women: false },
      { year: '1994/1995', women: false },
      { year: '1995/1996', women: false },
      { year: '1996/1997', women: false },
      { year: '1997/1998', women: false },
      { year: '1998/1999', women: false },
      { year: '1999/2000', women: false },
      { year: '2000/2001', women: false },
      { year: '2001/2002', women: false },
      { year: '2002/2003', women: false },
      { year: '2003/2004', women: false },
      { year: '2004/2005', women: false },
      { year: '2005/2006', women: false },
      { year: '2006/2007', women: false },
      { year: '2007/2008', women: false },
      { year: '2008/2009', women: false },
      { year: '2009/2010', women: false },
      { year: '2010/2011', women: false },
      { year: '2011/2012', women: false },
      { year: '2012/2013', women: false },
      { year: '2013/2014', women: false },
      { year: '2014/2015', women: false },
      { year: '2015/2016', women: false },
      { year: '2016/2017', women: false },
      { year: '2017/2018', women: false },
      { year: '2018/2019', women: false },
      { year: '2019/2020', women: false },
      { year: '2020/2021', women: false },
      { year: '2021/2022', women: false },
      { year: '2022/2023', women: false },
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
