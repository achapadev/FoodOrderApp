// we will work with dummy meals data which is baked into this component

import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // the function you pass to useEffect should not return a Promise
  // the function you pass to useEffect may return a cleanup function which can be executed
  // that cleanup function should run synchronously

  // if you want to use async/await inside useEffect create a new function inside that uses async/await and execute as part of useEffect
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-c03a9-default-rtdb.firebaseio.com/meals.json'
      )
      const responseData = await response.json()
      // responseData will be an object but we want an array .. need to transform this
      const loadedMeals = []
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }
      setMeals(loadedMeals) //set Meals state using the loadedMeals helper constant
      setIsLoading(false)
    }
    fetchMeals()
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
