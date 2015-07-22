COMPILER=java -jar compiler/compiler.jar
COMPILER_LIBRARY=compiler/library/closure-library-master/closure

COMPILER_ARGS=--js $(SOURCES) --externs $(EXTERN) --output_wrapper "(function() {%output%})();" --only_closure_dependencies --closure_entry_point branch_instance
COMPILER_MIN_ARGS=--compilation_level ADVANCED_OPTIMIZATIONS --define 'DEBUG=false'
COMPILER_DEBUG_ARGS=--formatting=print_input_delimiter --formatting=pretty_print --warning_level=VERBOSE --define 'DEBUG=true'

SOURCES=Web-SDK/src/0_config.js Web-SDK/src/0_storage.js Web-SDK/src/0_session.js Web-SDK/src/0_utils.js Web-SDK/src/0_queue.js Web-SDK/src/0_banner_utils.js Web-SDK/src/1_api.js Web-SDK/src/1_resources.js Web-SDK/src/1_banner_css.js Web-SDK/src/1_banner_html.js Web-SDK/src/2_banner.js Web-SDK/src/3_branch.js Web-SDK/src/4_initialization.js $(COMPILER_LIBRARY)/goog/**
EXTERN=Web-SDK/src/extern.js

VERSION=$(shell grep "version" package.json | perl -pe 's/\s+"version": "(.*)",/$$1/')

ONPAGE_CORDOVA_TEST=$(subst ",\",$(shell perl -pe 'BEGIN{$$sub="../dist/build.js"};s\#SCRIPT_URL_HERE\#$$sub\#' src/onpage.js | $(COMPILER) | node transform.js branch_sdk))

.PHONY: clean

all: dist/build.min.js dist/build.js README.md CORDOVA_GUIDE.md
clean:
	rm -f dist/** docs/cordova/3_branch_cordova.md README.md CORDOVA_GUIDE.md
release: clean all
	@echo "released"

# Kinda gross, but will download closure compiler if you don't have it.
compiler/compiler.jar:
	mkdir -p compiler && \
		wget http://dl.google.com/closure-compiler/compiler-latest.zip && \
		unzip compiler-latest.zip -d compiler && \
		rm -f compiler-latest.zip

compiler/library/closure-library-master/closure/goog/**:
	mkdir -p compiler/library && \
		wget https://github.com/google/closure-library/archive/master.zip && \
		unzip master.zip -d compiler/library && \
		rm -f master.zip

dist/build.js: $(SOURCES) $(EXTERN) compiler/compiler.jar
	$(COMPILER) $(COMPILER_ARGS) $(COMPILER_DEBUG_ARGS) --define 'CORDOVA_BUILD=true' > dist/build.js

dist/build.min.js: $(SOURCES) $(EXTERN) compiler/compiler.jar
	$(COMPILER) $(COMPILER_ARGS) $(COMPILER_MIN_ARGS) --define 'CORDOVA_BUILD=true' > dist/build.min.js

testbeds/web/example.html: src/web/example.template.html
ifeq ($(MAKECMDGOALS), release)
	perl -pe 'BEGIN{$$a="$(ONPAGE_RELEASE)"}; s#// INSERT INIT CODE#$$a#' src/web/example.template.html > testbeds/web/example.html
else
	perl -pe 'BEGIN{$$a="$(ONPAGE_DEV)"}; s#// INSERT INIT CODE#$$a#' src/web/example.template.html > testbeds/web/example.html
endif

# Documentation

docs/cordova/3_branch_cordova.md: $(SOURCES)
	perl -pe 's/\/\*\*\ =WEB/\/\*\*\*/gx' src/3_branch.js > src/3_branch_cordova.js
	perl -p -i -e 's/=CORDOVA//gx' src/3_branch_cordova.js
	jsdox src/3_branch_cordova.js --output docs/cordova
	rm src/3_branch_cordova.js

README.md: docs/0_notice.md docs/readme/1_main.md docs/4_footer.md
	cat docs/0_notice.md docs/readme/1_main.md docs/4_footer.md | \
		perl -pe 'BEGIN{$$a="$(ONPAGE_RELEASE)"}; s#// INSERT INIT CODE#$$a#' > README.md

CORDOVA_GUIDE.md: docs/0_notice.md docs/cordova/1_intro.md docs/cordova/3_branch_cordova.md docs/4_footer.md
	perl build_utils/toc_generator.pl src/3_branch.js docs/cordova/2_table_of_contents.md CORDOVA
	cat docs/0_notice.md docs/cordova/1_intro.md docs/cordova/2_table_of_contents.md docs/cordova/3_branch_cordova.md docs/4_footer.md | \
		perl -pe 'BEGIN{$$a="$(ONPAGE_RELEASE)"}; s#// INSERT INIT CODE#$$a#' > CORDOVA_GUIDE.md
	perl -p -i -e 's/# Global//' CORDOVA_GUIDE.md
