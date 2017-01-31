apt-get update && apt-get install fswebcam && apt-get install ntp && apt-get install ntpdate &&
# Default to UTC if no TIMEZONE env variable is set
echo "Setting time zone to ${TIMEZONE=UTC}"
# This only works on Debian-based images
echo "${TIMEZONE}" > /etc/timezone
dpkg-reconfigure tzdata
while : ; do
    date
    sleep 60
done && sudo service ntp stop ; sudo ntpdate -s br.pool.ntp.org ; sudo service ntp start