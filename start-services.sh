#!/bin/bash

error_exit() {
  printf '%s: "Error: %s\n' "$0" "$1" >&2
  exit 1
}

start_backend() {
  cd monorepo/coding-challenge-server || error_exit "could go to backend service directory"
  npm install
  npm run start &
  cd - || error_exit "could not change directory back to original"
}

start_frontend() {
  cd monorepo/frontend || error_exit "could go to frontend directory"
  npm install
  #npx au run --watch &
  npx au run --open &
  cd - || error_exit "could not change directory back to original"
}

# Start both services
start_backend
start_frontend