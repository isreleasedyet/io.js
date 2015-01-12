DUO := $(shell npm bin)/duo

build = $(DUO) -S $(4) $(3) $(2) > $(1)
build_js = $(call build,$(1),$(2),$(3),--use duo-6to5)
build_css = $(call build,$(1),$(2),$(3),--use duo-autoprefixer)

all: web/build/main.js web/build/main.css

web/build/main.js: web/src/*.js
	@test -d $(dirname $(@)) || mkdir -p $(dirname $(@))
	$(call build_js,$(@),web/src/main.js)

web/build/main.css: web/src/*.css
	@test -d $(dirname $(@)) || mkdir -p $(dirname $(@))
	$(call build_css,$(@),web/src/main.css)

.PHONY: watch
watch:
	$(call build_js,web/build/main.js,web/src/main.js,--watch)
