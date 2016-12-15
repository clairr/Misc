#!/usr/bin/env python
from __future__ import print_function
import pickle
import requests
from random import randrange
ARQUIVO='sort.txt'

class Concurso():

  def __init__(self, pconcurso, pdata, pdezenas):
    self.numero = pconcurso
    self.data = pdata
    self.dezenas = pdezenas

  def __str__(self):
    snumero  = str(self.numero)
    sdata    = str(self.data)
    sdezenas = str([str(x).zfill(2) for x in sorted(self.dezenas)])
    return  snumero.rjust(4) +' '+ sdata +' '+ sdezenas


def get_online(nr_concurso=0, sess=requests.session()):
  def extrai_dados(texto):
    if texto[:texto.find('|')] == '':
      return Concurso('','','')

    vNumero = int(texto[:texto.find('|')])

    vdezenas = texto[texto.find('<ul>'):texto.find('</ul>')]
    vdezenas = vdezenas.replace('<ul><li>','')
    vdezenas = vdezenas.replace('</li><li>',';')
    vdezenas = vdezenas.replace('</li>','')
    vdezenas = vdezenas.split(';')
    vdezenas = [int(x) for x in vdezenas]

    texto = texto[texto.rfind('</a>'):]
    data = texto.split('|')
    if data[1] == '' :
      vData = data[2]
    else:
      vData = data[1]

    return Concurso(vNumero, vData, vdezenas)

  if nr_concurso==0:
    url="http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?f_megasena=/"
  else:
    url="http://www1.caixa.gov.br/loterias/loterias/megasena/megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso="+str(nr_concurso)
  r = sess.get(url)
  #print r.text
  vConcurso = extrai_dados(r.text)
  return vConcurso

def carregar_concursos(arquivo=ARQUIVO):
  dic_concursos={}
  try:
    with open(arquivo) as f:
      while True:
        try:
          e = pickle.load(f)
          dic_concursos[e.numero] = e
        except EOFError:
          break
  except IOError:
    print('Nao existem dados a carregar.')
  return dic_concursos

def salvar_concursos(dic_concursos,arquivo=ARQUIVO):
  with open(arquivo,'w') as f:
    for e in dic_concursos.keys():
      pickle.dump(dic_concursos[e],f)

def atualizar_concursos(dic_concursos, arquivo=ARQUIVO):
  s=requests.session()
  ultimo = get_online(0,s)
  if len(dic_concursos) == 0:
    primeiro = 1
  else:
    primeiro = len(dic_concursos)+1
  for nr in range(primeiro, ultimo.numero+1):
    print('Recuperando sorteio nr '+str(nr))
    conc = get_online(nr,s)
    dic_concursos[nr]=conc
  return dic_concursos

def gerar_jogo():
  concursos = carregar_concursos()
  dezenas=[]
  for jogo in concursos:
    dezenas.append(sorted(concursos[jogo].dezenas))
  jogo=set([])
  while len(jogo)<6:
    jogo.add(randrange(1,61))
    if (len(jogo)==6 and sorted(list(jogo)) in dezenas):
      jogo.clear()
  return sorted(list(jogo))

if __name__ == "__main__":
  print("Carregando variavel concursos")
  concursos = carregar_concursos()
  print("Atualizando concursos")
  concursos = atualizar_concursos(concursos)
  print("Ultimo sorteio:", len(concursos))
  print(concursos[len(concursos)])
  salvar_concursos(concursos)
  print("Para imprimir algum sorteio: print(concursos[sorteio])")
