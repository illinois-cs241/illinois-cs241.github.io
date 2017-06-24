for f in $(find _wikibook -name "*md"); do mv "$f" "$(echo $f | sed -e 's/[:,#]//g')"; done
for f in $(find _wikibook -name "*md"); do sed -i '1s/^/---\nlayout: doc\ntitle:"$f"\n---\n\n/' $f; done
