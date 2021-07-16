import React, { useState, useEffect, useReducer } from "react";
import Axios from "axios"; //make request thru api

const TechStackList = () => {
  const [techStacks, setTechStacks] = useState([]); //to store data & render in DOM
  const [active, setActive] = useState("None");

  // useReducer returns an array that holds the current state value
  const [input, dispatch] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: "",
      techname: "",
      datecreated: "",
      datemodified: "",
      global: "",
    }
  );

  const getTechStacks = async () => {
    Axios.get("/techstacks") //fetch api to read files
      .then((res) => {
        let techstacks = res.data[0];
        techstacks = techstacks.filter((techstack) => techstack.techname !== "System Administration");
        setTechStacks(techstacks);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getTechStacks();
  }, [active]);

  // escape special characters from search string
  const escapeRegex = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  //Handling change when there is changes in textbox
  const handleChangeValue = (event) => {
    const inputName = event.target.id;
    const inputValue = event.target.value;


    //dispatch function, which  pass an action and later invoke
    dispatch({ [inputName]: inputValue });
  };

  // copy techstacks from state
  let techStacksData = techStacks;

  // conditional filtering that execute when input query length > 0
  if (input.global.length > 0) {
    techStacksData = techStacksData.filter((i) => {
      return (
        //set value filtering based on employmentlist data object with or condition
        i.techname.toLowerCase().match(escapeRegex(input.global)) ||
        i.datecreated.match(escapeRegex(input.global)) ||
        i.datemodified.match(escapeRegex(input.global)) ||
        i.id.toString().match(escapeRegex(input.global))
      );
    });
  } else if (input.id.length > 0) {
    techStacksData = techStacksData.filter((i) => {
      return i.id.toString().match(escapeRegex(input.id));
    });
  } else if (input.techname.length > 0) {
    techStacksData = techStacksData.filter((i) => {
      return i.techname.toLowerCase().match(escapeRegex(input.techname));
    });
  } else if (input.datecreated.length > 0) {
    techStacksData = techStacksData.filter((i) => {
      return i.datecreated.match(escapeRegex(input.datecreated));
    });
  } else if (input.datemodified.length > 0) {
    techStacksData = techStacksData.filter((i) => {
      return i.datemodified.match(escapeRegex(input.datemodified));
    });
  }

  //handle ascending sort
  const onAscSort = (e) => {
    let techstacks = [...techStacks];
    //switch case to columns
    switch (e.target.id) {
      case ("id"):
        techstacks = techstacks.sort((a, b) => a.id - b.id);
        break;
      case ("techname"):
        techstacks = techstacks.sort((a, b) => a.techname.localeCompare(b.techname));
        break;
      case ("datecreated"):
        techstacks = techstacks.sort((a, b) => a.datecreated.localeCompare(b.datecreated));
        break;
      case ("datemodified"):
        techstacks = techstacks.sort((a, b) => a.datemodified.localeCompare(a.datemodified));
        break;
      default:
    }
    setTechStacks(techstacks);
  };

  // handle descending sorting
  const onDesSort = (e) => {
    let techstacks = [...techStacks];

    // identify which columns through target id
    switch (e.target.id) {
      case ("id"):
        techstacks = techstacks.sort((a, b) => a.id - b.id);
        techstacks.reverse();
        break;
      case ("techname"):
        techstacks = techstacks.sort((a, b) => a.techname.localeCompare(b.techname));
        techstacks.reverse();
        break;
      case ("datecreated"):
        techstacks = techstacks.sort((a, b) => a.datecreated.localeCompare(b.datecreated));
        techstacks.reverse();
        break;
      case ("datemodified"):
        techstacks = techstacks.sort((a, b) => a.datemodified.localeCompare(a.datemodified));
        techstacks.reverse();
        break;
      default:
    }
    setTechStacks(techstacks);
  };
  
  return (
    <div className="col-md-6">
      <div className="panel panel-default shadow p-3 mb-5 bg-white">
        <b>Views for TechStacks/Skills</b>
        <div className="float-right m-2">
          <input
            className="form-control py-1 border-right-0 border"
            type="text"
            id="global"
            placeholder="search"
            //call the handle change function
            onChange={handleChangeValue}
            value={input.global}
          />
        </div>
        <table className="table table-condensed table-hover table-responsive">
          <thead className="thead-dark">
            <tr>
              <th>
                <div>ID
                  <button id="id" onClick={e => onAscSort(e)}>▲</button>
                  <button id="id" onClick={e => onDesSort(e)}>▼</button>
                  <input
                    className="form-control"
                    type="text"
                    id="id"
                    placeholder="search"
                    //call the handle change function
                    onChange={handleChangeValue}
                    value={input.id}
                  />
                </div>
              </th>
              <th>
                <div>Tech Name
                  <button id="techname" onClick={e => onAscSort(e)}>▲</button>
                  <button id="techname" onClick={e => onDesSort(e)}>▼</button>
                  <input
                    className="form-control"
                    type="text"
                    id="techname"
                    placeholder="search"
                    //call the handle change function
                    onChange={handleChangeValue}
                    value={input.typename}
                  />
                </div>
              </th>
              <th>
                <div>Date Created
                  <button id="datecreated" onClick={e => onAscSort(e)}>▲</button>
                  <button id="datecreated" onClick={e => onDesSort(e)}>▼</button>
                  <input
                    className="form-control"
                    type="text"
                    id="datecreated"
                    placeholder="search"
                    //call the handle change function
                    onChange={handleChangeValue}
                    value={input.datecreated}
                  />
                </div>
              </th>
              <th>
                <div>Date Modified
                  <button id="datemodified" onClick={e => onAscSort(e)}>▲</button>
                  <button id="datemodified" onClick={e => onDesSort(e)}>▼</button>
                  <input
                    className="form-control"
                    type="text"
                    id="datemodified"
                    placeholder="search"
                    //call the handle change function
                    onChange={handleChangeValue}
                    value={input.datemodified}
                  />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {techStacksData.map((val, key) => (
              <tr key={val.id}>
                <td>{val.id}</td>
                <td>{val.techname}</td>
                <td>{val.datecreated}</td>
                <td>{val.datemodified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TechStackList;
