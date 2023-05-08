import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'
import {useState,useEffect} from 'react'

/*const DUMMY_MEALS = [
  {
    id: 'm1',
    name: 'Sushi',
    description: 'Finest fish and veggies',
    price: 22.99,
  },
  {
    id: 'm2',
    name: 'Schnitzel',
    description: 'A german specialty!',
    price: 16.5,
  },
  {
    id: 'm3',
    name: 'Barbecue Burger',
    description: 'American, raw, meaty',
    price: 12.99,
  },
  {
    id: 'm4',
    name: 'Green Bowl',
    description: 'Healthy...and green...',
    price: 18.99,
  },
];*/

const AvailableMeals = () => {
  const[meals,setMeals]=useState([])
  const[isLoading,setIsLoading]=useState(false)
  const[httpError,setHttpError]=useState(null)


     useEffect(()=>{
      setIsLoading(true)
      const fetchMeals= async ()=>{ 
           const response= await fetch('https://order-f-rcg2-default-rtdb.firebaseio.com/meals.json')
          if(!response.ok) {
               throw new Error('Something is not ok')


          }


           const  responseData =  await response.json()
           const loadedMeals =[]
           for(const key in responseData){
            loadedMeals.push({id:key,
                              name: responseData[key].name,
                              description: responseData[key].description,
                              price: responseData[key].price
            
            })
          }
            setMeals(loadedMeals)
            setIsLoading(false)
           
      }
    
      fetchMeals().catch((error)=>
      { setIsLoading(false)
        setHttpError(error.message)})
    }

      ,[]
)


if(isLoading){
    return (<p className={classes.MealsLoading} >Is Loading...</p>)
}

if(httpError){
  return (<p className={classes.MealsError}>Failed to fetch</p>)

}



  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;