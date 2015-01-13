NPM_BIN := $(shell npm bin)
DUO := $(NPM_BIN)/duo
BORSCHIK := $(NPM_BIN)/borschik

build = $(DUO) -S $(4) $(3) $(2) > $(1)
build_js = $(call build,$(1),$(2),$(3),--use duo-6to5)
build_css = $(call build,$(1),$(2),$(3),--use duo-autoprefixer)

all: web/build/_main.js web/build/_main.css

web/build/main.js: web/src/*.js
	@test -d $(dir $(@)) || mkdir -p $(dir $(@))
	$(call build_js,$(@),web/src/main.js)

web/build/_%: web/build/%
	$(BORSCHIK) -i $(<) -o $(@)

web/build/main.css: web/src/*.css
	@test -d $(dir $(@)) || mkdir -p $(dir $(@))
	$(call build_css,$(@),web/src/main.css)
