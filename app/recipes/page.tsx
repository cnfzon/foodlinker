'use client';

import { useState } from 'react';
import styles from './recipes.module.css';

// 食譜類型定義
interface Recipe {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  ingredients: string[];
  difficulty: '簡單' | '中等' | '困難';
  cookingTime: string;
}

// 預設食譜數據
const recipes: Recipe[] = [
  {
    id: '1',
    title: '剩飯炒飯',
    description: '利用剩餘的白飯，加入冰箱裡的蔬菜和雞蛋，快速製作美味的炒飯。',
    tags: ['剩飯', '雞蛋', '蔬菜'],
    imageUrl: '/recipes/fried-rice.jpg',
    ingredients: ['剩飯', '雞蛋', '胡蘿蔔', '青蔥', '醬油'],
    difficulty: '簡單',
    cookingTime: '15分鐘'
  },
  {
    id: '2',
    title: '麵包布丁',
    description: '將過期的麵包重新利用，製作成香甜可口的麵包布丁。',
    tags: ['麵包', '雞蛋', '牛奶'],
    imageUrl: '/recipes/bread-pudding.jpg',
    ingredients: ['過期麵包', '雞蛋', '牛奶', '糖', '肉桂粉'],
    difficulty: '簡單',
    cookingTime: '30分鐘'
  },
  {
    id: '3',
    title: '蔬菜湯',
    description: '利用各種剩餘蔬菜，熬煮一鍋營養豐富的蔬菜湯。',
    tags: ['蔬菜', '湯品'],
    imageUrl: '/recipes/vegetable-soup.jpg',
    ingredients: ['胡蘿蔔', '洋蔥', '芹菜', '番茄', '高湯'],
    difficulty: '簡單',
    cookingTime: '45分鐘'
  },
  {
    id: '4',
    title: '水果沙拉',
    description: '將即將過熟的水果製作成清爽的水果沙拉。',
    tags: ['水果', '沙拉'],
    imageUrl: '/recipes/fruit-salad.jpg',
    ingredients: ['香蕉', '蘋果', '奇異果', '優格', '蜂蜜'],
    difficulty: '簡單',
    cookingTime: '10分鐘'
  },
  {
    id: '5',
    title: '剩菜炒麵',
    description: '將剩餘的蔬菜和肉類與麵條一起炒，製作美味的炒麵。',
    tags: ['麵條', '蔬菜', '肉類'],
    imageUrl: '/recipes/stir-fried-noodles.jpg',
    ingredients: ['麵條', '剩菜', '肉類', '醬油', '蒜末'],
    difficulty: '中等',
    cookingTime: '20分鐘'
  },
  {
    id: '6',
    title: '蔬菜煎餅',
    description: '利用剩餘的蔬菜製作營養美味的蔬菜煎餅。',
    tags: ['蔬菜', '麵粉', '雞蛋'],
    imageUrl: '/recipes/vegetable-pancake.jpg',
    ingredients: ['麵粉', '雞蛋', '胡蘿蔔', '青蔥', '鹽'],
    difficulty: '中等',
    cookingTime: '25分鐘'
  }
];

export default function RecipesPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 獲取所有唯一的標籤
  const allTags = Array.from(new Set(recipes.flatMap(recipe => recipe.tags)));

  // 過濾食譜
  const filteredRecipes = recipes.filter(recipe => 
    selectedTags.length === 0 || 
    selectedTags.some(tag => recipe.tags.includes(tag))
  );

  // 切換標籤選擇
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>食譜靈感</h1>
        <p className={styles.description}>
          探索如何將剩餘食材轉化為美味佳餚，讓每一份食物都能發揮最大價值。
        </p>
      </header>

      <div className={styles.filterContainer}>
        {allTags.map(tag => (
          <button
            key={tag}
            className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.selected : ''}`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className={styles.recipeGrid}>
        {filteredRecipes.map(recipe => (
          <article key={recipe.id} className={styles.recipeCard}>
            <div className={styles.imageContainer}>
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title}
                className={styles.recipeImage}
              />
              <div className={styles.recipeInfo}>
                <span className={styles.difficulty}>{recipe.difficulty}</span>
                <span className={styles.cookingTime}>{recipe.cookingTime}</span>
              </div>
            </div>
            <div className={styles.recipeContent}>
              <h2 className={styles.recipeTitle}>{recipe.title}</h2>
              <p className={styles.recipeDescription}>{recipe.description}</p>
              <div className={styles.tagContainer}>
                {recipe.tags.map(tag => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <button className={styles.viewButton}>
                查看食譜
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 