

import React, { useState, useEffect } from 'react';

const Permission = () => {
	const [header, setHeader] = useState([])
	const [data, setData] = useState([])


	useEffect(() => {

		//fetch permissionheader.json file
		fetch('/data/permissionheader.json')
			.then(response => response.json())
			.then(header => setHeader(header))

		//fetch permission.json file
		fetch('/data/permission.json')
			.then(response => response.json())
			.then(data => setData(data))
	}, [])

	return (
		<div >
			<center><b>USER PERMISSIONS</b></center>
			<table align="center" border="1px">
				<thead>
					{header.map(header => (
						<tr
							key={header.datecreated}>

							<td>{header.id}</td>
							<td>{header.permissionname}</td>
							<td>{header.datecreated}</td>

						</tr>
					))}
				</thead>

				<tbody>
					{data.map(data => (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{data.permissionname}</td>
							<td>{data.datecreated}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);

}

export default Permission;
