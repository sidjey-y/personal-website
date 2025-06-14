#!/bin/bash

# Create skills directory if it doesn't exist
mkdir -p public/images/skills

# Function to download SVG
download_svg() {
    local name=$1
    local url=$2
    curl -L "$url" -o "public/images/skills/$name.svg"
}

# Programming Languages
download_svg "java" "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg"
download_svg "python" "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
download_svg "javascript" "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg"
download_svg "csharp" "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg"
download_svg "sql" "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
download_svg "cpp" "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg"
download_svg "php" "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg"
download_svg "r" "https://raw.githubusercontent.com/devicons/devicon/master/icons/r/r-original.svg"

# AI & ML
download_svg "tensorflow" "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg"
download_svg "scikit" "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg"
download_svg "pandas" "https://raw.githubusercontent.com/devicons/devicon/master/icons/pandas/pandas-original.svg"

# Full-Stack
download_svg "react" "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
download_svg "spring" "https://raw.githubusercontent.com/devicons/devicon/master/icons/spring/spring-original.svg"
download_svg "nodejs" "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
download_svg "laravel" "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-plain.svg"
download_svg "vue" "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg"
download_svg "html5" "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg"
download_svg "tailwind" "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg"

# Databases
download_svg "postgresql" "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg"
download_svg "mongodb" "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg"
download_svg "mysql" "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original.svg"
download_svg "firebase" "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg"

# Game Development
download_svg "unity" "https://raw.githubusercontent.com/devicons/devicon/master/icons/unity/unity-original.svg" 