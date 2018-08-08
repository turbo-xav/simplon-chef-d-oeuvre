--
-- PostgreSQL database dump
--

-- Dumped from database version 10.3
-- Dumped by pg_dump version 10.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: wiki_tbl_role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wiki_tbl_role (
    id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.wiki_tbl_role OWNER TO postgres;

--
-- Name: wiki_tbl_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wiki_tbl_user (
    id integer NOT NULL,
    firstname character varying(100),
    lastname character varying(100),
    mail character varying(100),
    password character varying(20),
    uid character varying(6),
    fk_role integer
);


ALTER TABLE public.wiki_tbl_user OWNER TO postgres;

--
-- Data for Name: wiki_tbl_role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wiki_tbl_role (id, name) FROM stdin;
1	Admin
2	TechLead
3	User
4	Test
\.


--
-- Data for Name: wiki_tbl_user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.wiki_tbl_user (id, firstname, lastname, mail, password, uid, fk_role) FROM stdin;
1	Xavier	Tagliarino	xavier.tagliarino@cetelem.fr	password	417165	4
\.


--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 4, true);


--
-- Name: wiki_tbl_role wiki_tbl_role_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki_tbl_role
    ADD CONSTRAINT wiki_tbl_role_pkey PRIMARY KEY (id);


--
-- Name: wiki_tbl_user wiki_tbl_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki_tbl_user
    ADD CONSTRAINT wiki_tbl_user_pkey PRIMARY KEY (id);


--
-- Name: wiki_tbl_user fk89c8335b87f8d1cf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wiki_tbl_user
    ADD CONSTRAINT fk89c8335b87f8d1cf FOREIGN KEY (fk_role) REFERENCES public.wiki_tbl_role(id);


--
-- PostgreSQL database dump complete
--

