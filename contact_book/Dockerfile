FROM python:3.8

RUN apt-get update -y && apt-get install -y build-essential libffi-dev python-dev npm

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . ./
