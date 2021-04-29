VERSION:= $$(cat VERSION)

# Ustawienia aplikacji
DOCKER_COMPOSE_SETTINGS  = --project-name typing_world --env-file .env -f docker-compose.yml

# Uruchamianie aplikacji

docker-build:
	export VERSION=${VERSION} && \
	docker-compose $(DOCKER_COMPOSE_SETTINGS)  build

docker-up:
	export VERSION=${VERSION} && \
	docker-compose $(DOCKER_COMPOSE_SETTINGS) up -d

docker-restart:
	export VERSION=${VERSION} && \
	docker-compose $(DOCKER_COMPOSE_SETTINGS) restart

docker-down:
	export VERSION=${VERSION} && \
	docker-compose $(DOCKER_COMPOSE_SETTINGS) down

docker-logs:
	export VERSION=${VERSION} && \
	docker-compose $(DOCKER_COMPOSE_SETTINGS) logs -f