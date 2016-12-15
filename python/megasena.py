#!/usr/bin/env python
import urllib2
import pickle
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
  @classmethod  
  def get_online(self, nr_concurso=0):
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
    
    #ultimo concurso:
    url_uc="http://www1.caixa.gov.br/loterias/loterias/megasena/\
    megasena_pesquisa_new.asp?f_megasena="
    
    #http://www1.caixa.gov.br/loterias/loterias/..megasena/...
    #megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso=1270
    url="http://www1.caixa.gov.br/loterias/loterias/megasena/\
    megasena_pesquisa_new.asp?submeteu=sim&opcao=concurso&txtConcurso="
    
    if nr_concurso == 0:  
      for line in urllib2.urlopen(url_uc):
        ultimo_concurso = extrai_dados(line)
        return ultimo_concurso
    else:  
      for line in urllib2.urlopen(url+str(nr_concurso)):
        vConcurso = extrai_dados(line) 
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
    print 'Nao existem dados a carregar.'    
  return dic_concursos

def salvar_concursos(dic_concursos,arquivo=ARQUIVO):
  with open(arquivo,'w') as f:
    for e in dic_concursos.keys():
      pickle.dump(dic_concursos[e],f)

def atualizar_concursos(dic_concursos, arquivo=ARQUIVO):
  ultimo = Concurso.get_online()
  if len(dic_concursos) == 0:
    primeiro = 1
  else:
    primeiro = len(dic_concursos)+1
  for nr in range(primeiro, ultimo.numero+1):
    conc = Concurso.get_online(nr)
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

e = Concurso.get_online()
print e


