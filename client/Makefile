DESTDIR=
PREFIX=/usr
SYSCONFDIR=/etc

NPM:=$(shell which npm)
SYSTEMCTL:=$(shell which systemctl)

install:
	$(NPM) install
	if test -x "$(SYSTEMCTL)" && test -d "$(DESTDIR)$(SYSCONFDIR)/systemd/system"; then install -m0644 web-price-scraper.service $(DESTDIR)$(SYSCONFDIR)/systemd/system/web-price-scraper.service && $(SYSTEMCTL) daemon-reload; else echo "could not find systemd"; fi
	if test -e "$(DESTDIR)$(SYSCONFDIR)/systemd/system/web-price-scraper.service" && test ! -e "$(DESTDIR)$(SYSCONFDIR)/systemd/system/multi-user.target.wants/web-price-scraper.service"; then $(SYSTEMCTL) enable web-price-scraper.service && $(SYSTEMCTL) start web-price-scraper.service; else echo "web-price-scraper daemon is already enabled"; fi
