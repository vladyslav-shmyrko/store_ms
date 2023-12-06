#!/usr/bin/make

include .env
#-------- Make Environment --------------
.DEFAULT_GOAL := help

SHELL= /bin/sh
docker_bin= $(shell command -v docker 2> /dev/null)
docker_compose_bin= $(shell command -v docker-compose 2> /dev/null)
COMPOSE_CONFIG= --env-file .env -p $(PROJECT_NAME) -f docker/docker-compose.$(ENVIRONMENT).yml

help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z0-9_-]+:.*?## / {printf "  \033[92m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

--------------: ## ------------ [ACTIONS] ----------
up: ## Start all containers (in background) LOCAL
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d
down: ## Stop all started for development containers LOCAL
	$(docker_compose_bin) $(COMPOSE_CONFIG) down
bd-up: ## Start db (in background)
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d db_store_ms
	$(docker_compose_bin) $(COMPOSE_CONFIG) up -d pgadmin_ms
shell-gateway-once: ## Start bash session gateway container
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3000:3000 "gateway" bash
shell-gateway-once-dev: ## Start gateway container dev mode
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3000:3000 "gateway" npm run dev
shell-products-once: ## Start bash session products container
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3001:3001 "products-service" bash
shell-products-once-dev: ## Start products container dev mode
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3001:3001 "products-service" npm run dev
shell-customer-once: ## Start bash session customer container
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3002:3002 "customers-service" bash
shell-customer-once-dev: ## Start customer container dev mode
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3002:3002 "customers-service" npm run dev
shell-auth-once: ## Start bash session auth container
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3003:3003 "auth-service" bash
shell-auth-once-dev: ## Start auth container dev mode
	$(docker_compose_bin) $(COMPOSE_CONFIG) run --rm --user="$(CURRENT_USER_ID)" -p 3003:3003 "auth-service" npm run dev