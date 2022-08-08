import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  return (
    <form className={classes.form}>
      {/* extract input into re-usable prestyled input component to be used in multiple places */}
      {/* <input type="text" /> */}
      <Input
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm
