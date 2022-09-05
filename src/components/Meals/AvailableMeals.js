// we will work with dummy meals data which is baked into this component

import { useEffect, useState } from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import classes from './AvailableMeals.module.css'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()
  // the function you pass to useEffect should not return a Promise
  // the function you pass to useEffect may return a cleanup function which can be executed
  // that cleanup function should run synchronously

  // if you want to use async/await inside useEffect create a new function inside that uses async/await and execute as part of useEffect
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-http-c03a9-default-rtdb.firebaseio.com/meals.json'
      )
      if (!response.ok) {
        // fetchMeals function will now throw error if something goes wrong with fetch request
        // it is async function if we throw an error .. it will cause this promise to 'reject'
        // can't use try/catch to wrap it unless we turned useEffect function into async which we cannot

        throw new Error('Something went wrong!')
      }
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

    // use fact that it is promise and use catch method on it to handle errors / then method for success
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })

    // try {
    //   fetchMeals()
    // } catch (error) {
    //   setIsLoading(false)
    //   // by default error is object with a message property
    //   setHttpError(error.message)
    // }
  }, [])

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.MealsError}>
        <p>{httpError}</p>
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
