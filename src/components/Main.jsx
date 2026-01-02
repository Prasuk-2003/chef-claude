import { useState,useEffect,useRef } from "react"
import Recipe from "./ClaudeRecipe" 
import IngredientsList from "./IngredientsList"
import { getRecipeFromLlama } from "../ai"

export default function Main() {
    const [ingredients,setIngredients] = useState(["cumin","pasta","all the main spices","cheese"])
    const [recipe,setRecipe] = useState("")
    const recipeSection = useRef(null)

    useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null){
            recipeSection.current.scrollIntoView({behavior:"smooth"})
        }
    },[recipe])

    async function getRecipe(){
        const recipeText = await getRecipeFromLlama(ingredients)
        setRecipe(recipeText)
    }
    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prev => [...prev,newIngredient])
    }
    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button>Add ingredient</button>
            </form>
            {ingredients.length > 0 && 
                <IngredientsList ref={recipeSection} ingredients={ingredients} getRecipe={getRecipe}
            />}
            {recipe && <Recipe recipe={recipe}/>}
        </main>
    )
}