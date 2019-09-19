
# Events PWA



Een web applicatie met volgende functionaliteiten:

- Mogelijkheid om tickets aan te kopen.
- Web applicatie bezoeken.
- Reacties plaatsen op een evenement.
- Inloggen



## Communicatie front-end en back-end

Gegevens opgevraagd ( guests list gebruikt als vb.)

![home](https://i.imgur.com/9c3D2H4.png =3700x)


![post](https://i.imgur.com/x5HzafT.png=700x)


## Instalie
	
1. Clone of download de code die u op gitlab kan terug vinden.

2. In je cmd in de homestead folder: vagrant up.

3. Voor de database kunt u de code van laravel gebruiken. In de cmd php artisan migrate doen 		om zo je tabellen aan te maken .

4. Daarna doe je in de cmd php artisan db:seed

5. php artisan db:seed --class=GuestsSeeder in de cmd. (Dit zorgt ervoor dat er random data in je database komt.)

6.  start de index.html

7. Log in met admin@gmail.com en admin als wachtwoord.

8. Nu Zal je een lijst met alle guets zien.  (Zoals op de foto hierboven)



##  Laatste wijzigingen	

Connectie aangemaakt tussen js studio en laravel Api.


###	frontend


- Lijst met alle guests.
- Get-request naar de laravel Api. (voor de lijst met Guests)
- POST-request naar de laravel Api. (voor de log in)


### back-end

-Get-request naar de database om de guests op te halen.


##  FAQ






## TODOs

- Mogelijkheid om tickets aan te kopen.
- Web applicatie bezoeken.
- Reacties plaatsen op een evenement.

## Wireframes

https://xd.adobe.com/view/7ceffe25-b112-46d5-6885-85affaabe5d2-0ade/

# Auteurs

Leonard qoli
