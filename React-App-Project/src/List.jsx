function List ({vehicles ,category}){



    const listItems = vehicles.map(vehicle => <li key={vehicle.position}> {vehicle.name}: &nbsp;
                                                            {vehicle.position} </li>);

    return (
        <>
            <h3>{category}</h3>
            <ol>{listItems}</ol>
        </>
    )
}

export default List;