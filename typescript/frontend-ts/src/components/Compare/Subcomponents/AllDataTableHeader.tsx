const AllDataTableHeader = () => {
  return (
    <thead>
      <tr key={`tableheadAllgames`}>
        <th scope="col" className="team">
          Lag
        </th>
        <th scope="col">M</th>
        <th scope="col">V</th>
        <th scope="col">O</th>
        <th scope="col">F</th>
        <th scope="col" className="twelve">
          GM
        </th>
        <th scope="col" className="twelve">
          IM
        </th>
        <th scope="col" className="twelve">
          MS
        </th>
        <th scope="col">P</th>
      </tr>
    </thead>
  )
}

export default AllDataTableHeader
