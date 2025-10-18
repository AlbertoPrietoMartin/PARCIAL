#!/bin/bash

# ===============================================
# 🚀 Script para inicializar un proyecto Node + TypeScript
# ===============================================

echo "📁 Inicializando nuevo proyecto Node.js..."
npm init -y

echo "📦 Instalando TypeScript y dependencias de desarrollo..."
npm install --save-dev typescript ts-node @types/node

echo "⚙️ Creando archivo tsconfig.json..."
npx tsc --init

echo "✅ Proyecto TypeScript configurado correctamente."
echo "Puedes crear tu archivo principal con:  touch src/index.ts"
