import React, { useEffect, useState } from "react";
/*I know this is overkill for the demo, but wanted to do it this way as I find myself seting up services per environment*/
import services from "../../config/services";
import * as _ from "underscore";
import axios from "axios";

const FetchRewards = () => {
  const [lookupData, setLookupData] = useState([]);

  useEffect(() => {
    //Normally I would create a proxy middleware endpoint to handle the cors issue.
    //this is quick and dirty using https://cors-anywhere.herokuapp.com/
    const serviceUrl = `${services.proxy}${services.fetchRewards.urls.test}${services.fetchRewards.paths.hiring}`;
    axios
      .get(serviceUrl)
      .then((response) => {
        setLookupData({ hiring: response.data });
      })
      .catch((error) => {
        console.log(`unable to retrieve data---->${error}`);
      });
  }, []);

  //Sort by listId
  const sortByListId = _.sortBy(lookupData.hiring, "listId");
  //Get rid of items with blank or null names
  const filteredNullsAndBlanks = sortByListId.filter((e) => {
    return e.name;
  });

  //group by listId, then sort by name
  let groupedByListId = _.groupBy(
    _.sortBy(filteredNullsAndBlanks, "name"),
    "listId"
  );

  //going to push markup into array
  let markup = [];
  //with some basic styles
  const myStyles = {
    display: "inline-block",
    marginRight: "15px",
  };

  //construct markup for render
  for (const [key, value] of Object.entries(groupedByListId)) {
    markup.push(<h3 key={`${key}-item`}>{`list ID: ${key}`}</h3>);
    value.map((item, index) =>
      markup.push(
        <div style={myStyles} key={`${key}-${item.name}-${index}`}>
          {`(NAME: ${item.name})`}
        </div>
      )
    );
  }

  return <div>{markup}</div>;
};

export default FetchRewards;
