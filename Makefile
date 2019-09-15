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

clean:
	$(RM) -r web/build

distclean: clean
	git clean -xdf

release:
	mkdir -p release/build
	touch release/.nojekyll
	mv web/build/_* release/build/
	cat web/iojs.html | sed -e \
	 	's#</body>#<!-- Yandex.Metrika counter --><script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter27889377 = new Ya.Metrika({ id:27889377 }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script><noscript><div><img src="//mc.yandex.ru/watch/27889377" style="position:absolute; left:-9999px;" alt="" /></div></noscript><!-- /Yandex.Metrika counter --></body>#' \
		> release/index.html

.PHONY: all clean distclean release
