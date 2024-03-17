-- table for many to many mapping of artist and albums
CREATE TABLE artist_albums (
  artist_id INT NOT NULL,
  album_id INT NOT NULL,
  FOREIGN KEY (artist_id) REFERENCES artists(id),
  FOREIGN KEY (album_id) REFERENCES albums(id),
  PRIMARY KEY (artist_id, album_id)
);
