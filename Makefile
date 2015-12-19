COMPILER=java -jar compiler/compiler.jar
COMPILER_LIBRARY=compiler/library/closure-library-master/closure

COMPILER_ARGS=--js $(SOURCES) --externs $(EXTERN) --output_wrapper "(function() {%output%})();" --only_closure_dependencies --closure_entry_point branch_instance
COMPILER_MIN_ARGS=--compilation_level ADVANCED_OPTIMIZATIONS --define 'DEBUG=false'
COMPILER_DEBUG_ARGS=--formatting=print_input_delimiter --formatting=pretty_print --warning_level=VERBOSE --define 'DEBUG=true'

SOURCES=Web-SDK/src/0_config.js Web-SDK/src/0_queue.js Web-SDK/src/1_utils.js Web-SDK/src/2_resources.js Web-SDK/src/2_session.js Web-SDK/src/2_storage.js Web-SDK/src/3_api.js Web-SDK/src/3_banner_utils.js Web-SDK/src/4_banner_css.js Web-SDK/src/4_banner_html.js Web-SDK/src/5_banner.js Web-SDK/src/6_branch.js Web-SDK/src/7_initialization.js $(COMPILER_LIBRARY)/goog/**
EXTERN=Web-SDK/src/extern.js

.PHONY: clean

all: dist/build.min.js dist/build.js Reference.md
clean:
	rm -f dist/** docs/cordova/3_branch_cordova.md Reference.md

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

# Documentation

docs/cordova/3_branch_cordova.md: $(SOURCES)
	perl -pe 's/\/\*\*\ =WEB/\/\*\*\*/gx' Web-SDK/src/6_branch.js > Web-SDK/src/3_branch_cordova.js
	perl -p -i -e 's/=CORDOVA//gx' Web-SDK/src/3_branch_cordova.js
	jsdox Web-SDK/src/3_branch_cordova.js --output docs/cordova
	rm Web-SDK/src/3_branch_cordova.js

Reference.md: docs/cordova/3_branch_cordova.md docs/4_footer.md
	perl Web-SDK/build_utils/toc_generator.pl Web-SDK/src/6_branch.js docs/cordova/2_table_of_contents.md CORDOVA
	cat docs/cordova/2_table_of_contents.md docs/cordova/3_branch_cordova.md docs/4_footer.md > Reference.md
	perl -p -i -e 's/# Global//' Reference.md
