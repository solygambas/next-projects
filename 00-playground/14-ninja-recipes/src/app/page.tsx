import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface Recipe {
  id: string;
  title: string;
  image: string;
  time: number;
  description: string;
  vegan: boolean;
}

async function getRecipes(): Promise<Recipe[]> {
  const response = await fetch("http://localhost:4000/recipes");
  return response.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="flex flex-col justify-between">
            <CardHeader className="flex-row gap-4 items-center">
              <div>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.time} mins to cook</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>{recipe.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button>View Recipe</button>
              {recipe.vegan && <p className="mt-0">Vegan!</p>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
