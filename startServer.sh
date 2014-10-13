#!/usr/bin/env bash

if [ ! -d ".env" ]; then
    echo "virtualenv not found or not configured. configuring for directory: .env"
    virtualenv .env
fi

source .env/bin/activate

PATH=$PWD"/poc":$PWD:$PATH

echo $PATH

# mongodb_engine package requires access to settings.py for some ridiculous reason
# https://github.com/django-nonrel/mongodb-engine/blob/master/django_mongodb_engine/__init__.py
export PYTHONPATH=$PYTHONPATH:$PWD
export DJANGO_SETTINGS_MODULE=react_poc.settings

export DEBUG=True

pip install -r requirements.txt
pip install -r requirements-testing.txt

python manage.py runserver 8001
