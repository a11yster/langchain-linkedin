PORT := 3000
OS := $(shell uname)

run: kill_old_process
	@PORT=$${PORT:-3000} node index.js

kill_old_process:
	@if [ "$(OS)" = "Darwin" ]; then \
		$(MAKE) kill_old_process_mac; \
	fi

kill_old_process_mac:
	@echo "Checking for existing process on port $(PORT) and killing it if found..."
	@PID=$$(lsof -ti :$(PORT)); \
	if [ -n "$$PID" ]; then \
		echo "Killing existing process on port $(PORT) with PID $$PID"; \
		kill -9 $$PID; \
	fi

.PHONY: run kill_old_process kill_old_process_mac
