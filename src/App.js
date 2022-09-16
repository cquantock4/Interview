import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

//Icons
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';



function App() {

  //Shows Details and list screen
  const [showdetails, setShowDetails] = useState(true);

  //Holds the current item id
  const [curritem, setCurrItem] = useState();

  //Holds an array of the items we are displaying
  const [items, setItems] = useState([]);

  //Holds all of the details for the current item
  const [itemdetails, setItemDetails] = useState([]);

  //Loading State Variable
  const [ isLoading, setIsLoading ] = useState(false);


  /*
    Search API for list of items
  */
  const fetchData = () => {

    setIsLoading(true)

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then(response => {
        return response.json()
      })
      .then(items => {
        setItems(items.drinks)
        //console.log(items.drinks)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  /*
    Clicking on Item in List
  */
  function onItemPress(value) {
    //Calling API to fetch the details
    getItemDetails(value)

    //Setting the current item ID
    setCurrItem(value)
    console.log(curritem)

    //Switch the display to show details
    setShowDetails(false)
  }

  /*
    Go Back Button, Switches the display back to the list view
  */
  function onGoBackPress() {
    setShowDetails(true)
  }


  /*
    Fetching API results, passing in the item ID
  */
  function getItemDetails(id) {

    setIsLoading(true)

    fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +  id)
      .then(response => {
        return response.json()
      })
      .then(itemdetails => {
        //retrieving the only item in the list
        setItemDetails(itemdetails.drinks[0])
        //console.log(itemdetails.drinks[0])
        setIsLoading(false)
      })
  }

  /*
    Returning just the header when we are waiting for the API to Load
    Not sure if this is the best way but it a quick fix to make a smoother transition. 
  */
  if (isLoading) return (
    <div>
        <header className="App-header">
          <div className="App-headercontainer">
            <div style={{float: 'left', paddingLeft: 50}}>
              <h1 style={{fontWeight: '200'}}>Cody Quantock, Anthology Interview</h1>
            </div>
            <div style={{float: 'right', paddingRight: 50}}>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div> 
        </header>
    </div>
  )

  return (
    <div className="App-container">
      <header className="App-header">
        <div style={{backgroundColor: '#282c34', flexDirection: 'row'}}>
          <div style={{float: 'left', paddingLeft: 50}}>
            <h1 style={{fontWeight: '200'}}>Cody Quantock, Anthology Interview</h1>
          </div>
          <div style={{float: 'right', paddingRight: 50}}>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div> 
      </header>
        <div style={{flexDirection: 'column'}}>
          
          <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: 100}}>

            {/* Controls whether we are showing the list or details screen */}
            { showdetails ? (
              <>
                {/* Title of results */}
                <div style={{display: 'flex'}}>
                  <h2 className="App-centeredtitle"> Margarita Drinks </h2>
                </div>
                
                {/* List of Items displayed in a list */}
                <div style={{display: 'flex'}}>
                  {
                    <ul className="App-list">
                    {items.map(items => {

                      let itemid = items.idDrink
                      return (
                        <li className="App-listitem" onClick={() => onItemPress(itemid)} key={items.idDrinks} >
                          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div>
                              {items.strDrink}
                            </div>
                            <div>
                              <FaChevronRight />
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  }
                </div>
              </>
          

            ) : (

              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

                  {/* Drink Title */}
                  <h1 className="App-centeredtitle">{itemdetails.strDrink}</h1>

                  {/* Ingredients List */}
                  <h2 style={{fontWeight: '400'}}>Ingredients:</h2>
                  { itemdetails.strIngredient1 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure1}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient1}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient2 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure2}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient2}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient3 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure3}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient3}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient4 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure4}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient4}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient5 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure5}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient5}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient6 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure6}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient6}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  { itemdetails.strIngredient7 ? (
                    <div className="App-ingredientrow">
                      <p style={{fontWeight: '500'}}>{itemdetails.strMeasure7}&nbsp; -</p>
                      <p>&nbsp;&nbsp;{itemdetails.strIngredient7}</p>
                    </div>
                  ) : (
                    <>
                    </>
                  )}  
                  
                </div>
                

                {/* Directions */}
                <div className="App-directionscontainer">
                  <h2 style={{fontWeight: '400'}}>Directions</h2>

                  { itemdetails.strInstructions ? (
                    <p style={{textAlign: 'center', lineHeight: 2}}>{itemdetails.strInstructions}</p>
                  ) : (
                    <>
                    </>
                  )}  
                  

                </div>

                {/* Back Button */}
                <button onClick={onGoBackPress} style={{padding: 15, width: 300}}>
                  <FaChevronLeft size={25} />
                </button>
              </div>
            
            )}
          </div>
        </div>
    
    
    </div>
      
   
  );
}

export default App;
