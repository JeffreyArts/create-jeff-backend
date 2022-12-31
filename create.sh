#!/bin/bash
if [ -n "$yarn_execpath" ]; then
  global_dir=$(yarn global dir)

  # Navigate to the node_modules directory in the global directory
  inputDir = "$global_dir/node_modules/create-jeff-backend"
elif [ -n "$npm_execpath" ]; then
  global_dir=$(npm root -g)

  # Navigate to the node_modules directory in the global directory
  inputDir = "$global_dir/create-jeff-backend"
else 
  inputDir='./dist'
fi

echo "PROJECT_CWD: $PROJECT_CWD"
echo "yarn_execpath: $yarn_execpath"
echo "npm_execpath: $npm_execpath"
echo "global_dir: $global_dir"
echo "inputDir: $inputDir"

# Recursively copy all files and directories from dist to output
function copyRecursive() {
  local src=$1
  local dest=$2

  local files=$(find "$src" -mindepth 1 -print)

  for file in $files; do
    local srcPath="$file"
    local destPath="$dest/${file#$src/}"
    # local fileStat=$(stat %F "$srcPath")

    cp -R "$srcPath" "$destPath"
    # if [ "$fileStat" == "directory" ]; then
    #   mkdir -p "$destPath"
    #   copyRecursive "$srcPath" "$destPath"
    # else
    # fi
  done
}

# Replace {{appName}} with provided app name in package.json
echo "Enter app name: "
read appName
appName=${appName:-app-name}

outputDir=$appName

# Check if output directory exists
if [ ! -d "$outputDir" ]; then
  mkdir "$outputDir"
fi

cp -R "$inputDir/" "$outputDir"


# rename .env.example to .env
mv "$outputDir/.env.example" "$outputDir/.env"

# replace {{appName}} with $appName in package.json
sed -i "" "s/{{appName}}/$appName/g" "$outputDir/package.json"

# Replace {{PORT}} with provided app name in package.json
echo "REST Server port (default: 3000): "
read PORT
PORT=${PORT:-3000}

sed -i "" "s/{{PORT}}/$PORT/g" "$outputDir/.env"

# Replace {{SOCKET_PORT}} with provided app name in package.json
echo "Socket port (default: 3000): "
read SOCKET_PORT
SOCKET_PORT=${SOCKET_PORT:-3000}

sed -i "" "s/{{SOCKET_PORT}}/$SOCKET_PORT/g" "$outputDir/.env"

cd $outputDir;
if [ -n "$yarn_execpath" ]; then
  yarn install
elif [ -n "$npm_execpath" ]; then
  npm install
fi