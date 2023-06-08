<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => fake()->imageUrl(), // Generate a random image URL
            'title' => fake()->sentence,
            'description' => fake()->paragraph,
            'price' => fake()->randomFloat(2, 10, 100),
            'category' => fake()->word,
        ];
    }
}
