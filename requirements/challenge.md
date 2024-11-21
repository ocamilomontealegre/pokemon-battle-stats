# Pokémon Battle Stats Challenge

## Context

Imagine you are building an application to track Pokémon battles. Each trainer has several Pokémon, and battles take place between them. The goal of this challenge is to practice using **Mongoose aggregation** to process and analyze data.

## Objectives of the Challenge

### 1. Models to Create

- **Trainer:** Includes attributes like name, age, and region.
- **Pokemon:** Includes name, type, level, health points, attack, and defense.
- **Battle:** Tracks battles between two trainers, the Pokémon involved, the result, and the winning trainer.

### 2. Populate the Models with Sample Data

- Create at least **2 trainers**.
- Create at least **4 different Pokémon** (from different types, e.g., Electric, Fire, Water, etc.).
- Create at least **3 battles** between the trainers.

### 3. Aggregation Queries

#### a. **Strongest Pokémon:**

Create a query to determine which **Pokémon has the highest combined level** of attack, defense, and health points. You can use a formula like: level + attack + defense + healthPoints

The query should return the strongest Pokémon.

#### b. **Trainer with the Most Victories:**

Write a query to identify the **trainer with the most victories**. Use aggregation to count the victories of each trainer and return the trainer with the most wins.

#### c. **Battle Statistics:**

Write a query that returns the **result** of each battle, with the Pokémon involved and the **total damage dealt** in the battle. This should include the health point difference between the Pokémon to determine how much damage was done during the battle.

#### d. **Most Used Pokémon:**

Find which **Pokémon participated in the most battles**. You can use `$lookup` to join battles with the involved Pokémon.

### 4. Additional Challenges

#### a. **Battle Duration:**

Add a field to each battle that indicates the **turn** in which a Pokémon was defeated. Create a query that calculates how many turns each battle lasted.

#### b. **Trainer Ranking:**

Use aggregation to rank the trainers by **number of victories** and display the **top 3 trainers** with the most wins.

---

## How to Get Started?

1. Create an **Express server**.
2. Define your **Mongoose models** for **Pokemon**, **Trainer**, and **Battle**.
3. Use aggregation operations like **$group**, **$match**, **$sort**, **$project**, **$unwind**, and **$lookup** to solve the queries.
4. Insert sample data and test the aggregation queries.

Good luck and enjoy the challenge! 🚀
